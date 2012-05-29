#define BUILDING_NODE_EXTENSION
#include <node.h>
#include "browser.h"
#include "top_v8.h"

using namespace v8;

Persistent<Function> Browser::constructor;

Browser::Browser(QString userAgent, QString libraryCode, QString cookies) {
  userAgent_ = userAgent;
  libraryCode_ = libraryCode;
  cookies_ = cookies;
  chimera_ = 0;
}
Browser::~Browser() {
  delete chimera_;
}

void Browser::Initialize(Handle<Object> target) {
  Local<FunctionTemplate> tpl = FunctionTemplate::New(New);
  tpl->SetClassName(String::NewSymbol("Browser"));
  tpl->InstanceTemplate()->SetInternalFieldCount(1);  

  tpl->PrototypeTemplate()->Set(String::NewSymbol("open"), FunctionTemplate::New(Open)->GetFunction());
  tpl->PrototypeTemplate()->Set(String::NewSymbol("close"), FunctionTemplate::New(Close)->GetFunction());
  tpl->PrototypeTemplate()->Set(String::NewSymbol("cookies"), FunctionTemplate::New(Cookies)->GetFunction());

  constructor = Persistent<Function>::New(
      tpl->GetFunction());
  target->Set(String::NewSymbol("Browser"), constructor);
}

Handle<Value> Browser::New(const Arguments& args) {
  HandleScope scope;

  QString userAgent = top_v8::ToQString(args[0]->ToString());
  QString libraryCode = top_v8::ToQString(args[1]->ToString());
  QString cookies = top_v8::ToQString(args[2]->ToString());
  Browser* w = new Browser(userAgent, libraryCode, cookies);
  w->Wrap(args.This());

  return args.This();
}

void AsyncWork(uv_work_t* req) {
    BWork* work = static_cast<BWork*>(req->data);
    work->chimera->wait();
    work->result = work->chimera->getResult();
    work->errorResult = work->chimera->getError();
}

void AsyncAfter(uv_work_t* req) {
    HandleScope scope;
    BWork* work = static_cast<BWork*>(req->data);

    if (work->error) {
        Local<Value> err = Exception::Error(String::New(work->error_message.c_str()));

        const unsigned argc = 1;
        Local<Value> argv[argc] = { err };

        TryCatch try_catch;
        work->callback->Call(Context::GetCurrent()->Global(), argc, argv);
        if (try_catch.HasCaught()) {
            node::FatalException(try_catch);
        }
    } else {
        const unsigned argc = 2;
        Local<Value> argv[argc] = {
            Local<Value>::New(Null()),
            Local<Value>::New(top_v8::FromQString(work->result))
        };

        TryCatch try_catch;
        work->callback->Call(Context::GetCurrent()->Global(), argc, argv);
        if (try_catch.HasCaught()) {
            node::FatalException(try_catch);
        }
    }

    work->callback.Dispose();
    delete work;
}

Handle<Value> Browser::Cookies(const Arguments& args) {
  HandleScope scope;

  QString cookies = "";
  Browser* w = ObjectWrap::Unwrap<Browser>(args.This());
  Chimera* chimera = w->getChimera();

  if (0 != chimera) {
    cookies = chimera->getCookies();
  }
  
  return scope.Close(top_v8::FromQString(cookies));
}
  
Handle<Value> Browser::Close(const Arguments& args) {
  HandleScope scope;
  
  Browser* w = ObjectWrap::Unwrap<Browser>(args.This());
  Chimera* chimera = w->getChimera();
 
  if (0 != chimera) {
    chimera->exit(1);
    w->setChimera(0);
    chimera->deleteLater();
  }
 
  return scope.Close(Undefined());
}

Handle<Value> Browser::Open(const Arguments& args) {
  HandleScope scope;
  
  if (!args[1]->IsString()) {
      return ThrowException(Exception::TypeError(
          String::New("Second argument must be a javascript string")));
  }

  if (!args[2]->IsFunction()) {
      return ThrowException(Exception::TypeError(
          String::New("Third argument must be a callback function")));
  }

  Local<Function> callback = Local<Function>::Cast(args[2]);
  
  BWork* work = new BWork();
  work->error = false;
  work->request.data = work;
  work->callback = Persistent<Function>::New(callback);

  Browser* w = ObjectWrap::Unwrap<Browser>(args.This());
  Chimera* chimera = w->getChimera();
  
  if (0 != chimera) {
    work->chimera = chimera;
  } else {
    work->chimera = new Chimera();
    work->chimera->setUserAgent(w->userAgent());
    work->chimera->setLibraryCode(w->libraryCode());
    work->chimera->setCookies(w->cookies());
    w->setChimera(work->chimera);
  }

  work->chimera->setEmbedScript(top_v8::ToQString(args[1]->ToString()));
  
  if (args[0]->IsString()) {
    work->url = top_v8::ToQString(args[0]->ToString());
    work->chimera->open(work->url);
  } else {
    work->chimera->execute();
  }

  int status = uv_queue_work(uv_default_loop(), &work->request, AsyncWork, AsyncAfter);
  assert(status == 0);
  
  return Undefined();
}
