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
            'qt/include',
            'qt/include/QtCore',
            'qt/include/QtGui',
            'qt/include/QtNetwork',
            'qt/include/QtWebKit'
          ],
          'libraries': [
            '../deps/openssl/linux/lib/libssl.a',
            '../deps/openssl/linux/lib/libcrypto.a',
            '../qt/lib/libQtCore.a',
            '../qt/lib/libQtGui.a',
            '../qt/lib/libQtXml.a',
            '../qt/lib/libQtNetwork.a',
            '../qt/lib/libQtWebKit.a',
            '../qt/lib/libwebcore.a',
            '../qt/lib/libjscore.a'
          ],
        }]
      ]
    }
  ]
}
