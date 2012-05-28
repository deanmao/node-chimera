#define BUILDING_NODE_EXTENSION
#include <node.h>

#include "browser.h"
#include "chimera.moc"

using namespace v8;

QApplication *app;

Handle<Value> ProcessEvents(const Arguments& args) {
    HandleScope scope;
    app->processEvents();
    return scope.Close(Undefined());
}

void Initialize(Handle<Object> target) {
  Browser::Initialize(target);
  
  int argc = 0;
  char** argv = NULL;
  app = new QApplication(argc, argv);
  
  target->Set(String::NewSymbol("processEvents"),
      FunctionTemplate::New(ProcessEvents)->GetFunction());
}

NODE_MODULE(chimera, Initialize)
