#ifndef BROWSER_H
#define BROWSER_H

#include <node.h>
#include <QApplication>
#include "chimera.h"

class Browser : public node::ObjectWrap {
 public:
  static void Initialize(v8::Handle<v8::Object> target);
  QApplication* GetWrapped() const { return q_; };
  Chimera* GetChimera() const { return chimera_; };

 private:
  Browser();
  ~Browser();
  static v8::Persistent<v8::Function> constructor;
  static v8::Handle<v8::Value> New(const v8::Arguments& args);

  // Wrapped methods
  static v8::Handle<v8::Value> Exec(const v8::Arguments& args);

  // Wrapped object
  QApplication* q_;
  Chimera* chimera_;
  static int argc_;
  static char** argv_;
};

#endif
