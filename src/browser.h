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

  QString userAgent() {return userAgent_; };
  QString libraryCode() {return libraryCode_; };
  QString cookies() {return cookies_; };

 private:
  Browser(QString userAgent, QString libraryCode, QString cookies, bool disableImages);
  ~Browser();
  static v8::Persistent<v8::Function> constructor;
  static v8::Handle<v8::Value> New(const v8::Arguments& args);
  static v8::Handle<v8::Value> Open(const v8::Arguments& args);
  static v8::Handle<v8::Value> Close(const v8::Arguments& args);
  static v8::Handle<v8::Value> Capture(const v8::Arguments& args);
  static v8::Handle<v8::Value> Cookies(const v8::Arguments& args);
  static v8::Handle<v8::Value> SetCookies(const v8::Arguments& args);

  Chimera* chimera_;
  QString libraryCode_;
  QString userAgent_;
  QString cookies_;
  bool disableImages_;
  static int argc_;
  static char** argv_;
};

#endif
