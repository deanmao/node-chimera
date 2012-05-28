#ifndef BROWSER_H
#define BROWSER_H

#include <node.h>
#include <QApplication>
#include <QTimer>
#include "chimera.h"

struct BWork {
    uv_work_t request;
    v8::Persistent<v8::Function> callback;
    bool error;
    std::string error_message;
    QString result;
    Chimera* chimera;
    QString code;
    QString url;
    QString errorResult;
};

class Browser : public node::ObjectWrap {
 public:
  static void Initialize(v8::Handle<v8::Object> target);
  Chimera* getChimera() const { return chimera_; };
  void setChimera(Chimera *chimera) { chimera_ = chimera; };

 private:
  Browser();
  ~Browser();
  static v8::Persistent<v8::Function> constructor;
  static v8::Handle<v8::Value> New(const v8::Arguments& args);

  // Wrapped methods
  static v8::Handle<v8::Value> Open(const v8::Arguments& args);

  // Wrapped object
  Chimera* chimera_;
  static int argc_;
  static char** argv_;
};

#endif
