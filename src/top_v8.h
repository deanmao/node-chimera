#ifndef TOPV8_H
#define TOPV8_H

#include <node.h>
#include <QString>

namespace top_v8 {

inline QString ToQString(v8::Local<v8::String> str) {
  return QString::fromUtf16( *v8::String::Value(str) );
}

inline v8::Local<v8::String> FromQString(QString str) {
  return v8::String::New( str.utf16() );
}

}

#endif
