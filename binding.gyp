{
  'targets': [
    {
      'target_name': 'chimera',
      'sources': [
        'src/top.cc',
        'src/cookiejar.cc',
        'src/chimera.cc',
        'src/browser.cc'
      ],
      'conditions': [
        ['OS=="mac"', {
          'include_dirs': [
            'qt/include',
            'qt/include/QtCore',
            'qt/include/QtGui',
            'qt/include/QtNetwork',
            'qt/include/QtWebkit'
          ],
          'libraries': [
            '-framework AppKit',
            '../qt/lib/libQtGui.a',
            '../qt/lib/libQtCore.a',
            '../qt/lib/libQtNetwork.a',
            '../qt/lib/libQtWebKit.a',
            '../qt/lib/libjscore.a',
            '../qt/lib/libwebcore.a',
            '../qt/lib/libQtXml.a'
          ],
        }],
        ['OS=="linux"', {
          'include_dirs': [
            'deps/qt-4.8.0/linux/include',
            'deps/qt-4.8.0/linux/include/QtCore',
            'deps/qt-4.8.0/linux/include/QtGui',
            'deps/qt-4.8.0/linux/include/QtNetwork',
            'deps/qt-4.8.0/linux/include/QtWebKit'
          ],
          'libraries': [
            '../deps/openssl/linux/lib/libssl.a',
            '../deps/openssl/linux/lib/libcrypto.a',
            '../deps/qt-4.8.0/linux/lib-v0.8/libQtCore.a',
            '../deps/qt-4.8.0/linux/lib-v0.8/libQtGui.a',
            '../deps/qt-4.8.0/linux/lib-v0.8/libQtXml.a',
            '../deps/qt-4.8.0/linux/lib-v0.8/libQtNetwork.a',
            '../deps/qt-4.8.0/linux/lib-v0.8/libQtWebKit.a',
            '../deps/qt-4.8.0/linux/lib-v0.8/libwebcore.a',
            '../deps/qt-4.8.0/linux/lib-v0.8/libjscore.a'
          ],
        }]
      ]
    }
  ]
}
