#!/bin/bash

if [ ! -f "qt-everywhere-opensource-src-5.0.2.tar.gz" ]
then
  echo 1
  #wget http://download.qt-project.org/official_releases/qt/5.0/5.0.2/single/qt-everywhere-opensource-src-5.0.2.tar.gz
  #tar zxf qt-everywhere-opensource-src-5.0.2.tar.gz
fi

cd qt-everywhere-opensource-src-5.0.2

COMPILE_JOBS=4

QT_CFG=''
QT_CFG+=' -opensource'
QT_CFG+=' -confirm-license'
QT_CFG+=' -v'
QT_CFG+=' -release'

if [[ $OSTYPE = darwin* ]]; then
    QT_CFG+=' -openssl'
    QT_CFG+=' -no-framework'
    QT_CFG+=' -no-c++11'
else
    QT_CFG+=' -fontconfig'
#    QT_CFG+=' -openssl-linked'
    QT_CFG+=' -no-opengl'
fi

QT_CFG+=' -qpa minimal'
QT_CFG+=' -qt-libjpeg'
QT_CFG+=' -qt-libpng'
QT_CFG+=' -qt-zlib'
QT_CFG+=' -qt-pcre'
QT_CFG+=' -nomake examples'
QT_CFG+=' -nomake tests'
QT_CFG+=' -skip qtwebkit-examples-and-demos'

# Irrelevant Qt features
QT_CFG+=' -no-cups'
QT_CFG+=' -no-kms'
QT_CFG+=' -rpath'
QT_CFG+=' -no-dbus'
QT_CFG+=' -no-xcb'
QT_CFG+=' -no-eglfs'
QT_CFG+=' -no-directfb'
QT_CFG+=' -no-linuxfb'
QT_CFG+=' -no-kms'

until [ -z "$1" ]; do
    case $1 in
        "--qt-config")
            shift
            QT_CFG+=" $1"
            shift;;
        "--jobs")
            shift
            COMPILE_JOBS=$1
            shift;;
        "--help")
            echo "Usage: $0 [--qt-config CONFIG] [--jobs NUM]"
            echo
            echo "  --qt-config CONFIG          Specify extra config options to be used when configuring Qt"
            echo "  --jobs NUM                  How many parallel compile jobs to use. Defaults to 4."
            echo
            exit 0
            ;;
        *)
            echo "Unrecognised option: $1"
            exit 1;;
    esac
done


# For parallelizing the bootstrapping process, e.g. qmake and friends.
export MAKEFLAGS=-j$COMPILE_JOBS

# if [[ $OSTYPE != darwin* ]]; then
#   export OPENSSL_LIBS='-L../openssl -lssl -lcrypto'
# fi

./configure -prefix $PWD/../qt $QT_CFG
#make -j8
#make install
