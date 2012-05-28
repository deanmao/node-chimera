#define BUILDING_NODE_EXTENSION
#include <node.h>

#include "browser.h"
#include "chimera.moc"

using namespace v8;

void Initialize(Handle<Object> target) {
  Browser::Initialize(target);
}

NODE_MODULE(chimera, Initialize)
