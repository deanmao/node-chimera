#define BUILDING_NODE_EXTENSION
#include <node.h>
#include "browser.h"
#include "top_v8.h"

using namespace v8;

Persistent<Function> Browser::constructor;

int Browser::argc_ = 0;
char** Browser::argv_ = NULL;

Browser::Browser() {
  q_ = new QApplication(argc_, argv_);
  chimera_ = new Chimera();
}

Browser::~Browser() {
  delete q_;
}

void Browser::Initialize(Handle<Object> target) {
  // Prepare constructor template
  Local<FunctionTemplate> tpl = FunctionTemplate::New(New);
  tpl->SetClassName(String::NewSymbol("Browser"));
  tpl->InstanceTemplate()->SetInternalFieldCount(1);  

  // Prototype
  tpl->PrototypeTemplate()->Set(String::NewSymbol("exec"),
      FunctionTemplate::New(Exec)->GetFunction());

  constructor = Persistent<Function>::New(
      tpl->GetFunction());
  target->Set(String::NewSymbol("Browser"), constructor);
}

Handle<Value> Browser::New(const Arguments& args) {
  HandleScope scope;

  Browser* w = new Browser();
  w->Wrap(args.This());

  return args.This();
}

Handle<Value> Browser::Exec(const Arguments& args) {
  HandleScope scope;

  Browser* w = ObjectWrap::Unwrap<Browser>(args.This());
  QApplication* q = w->GetWrapped();
  Chimera* c = w->GetChimera();
  
  c->execute(top_v8::ToQString(args[0]->ToString()));
  q->exec();
  c->returnValue();

  return scope.Close(Undefined());
}
