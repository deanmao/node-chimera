#ifndef CHIMERA_H
#define CHIMERA_H

#include <QtGui>
#include <QtWebKit>
#include <iostream>

class WebPage : public QWebPage {
    Q_OBJECT
public:
    WebPage(QObject *parent = 0);

public slots:
    bool shouldInterruptJavaScript();

protected:
    void javaScriptAlert(QWebFrame *originatingFrame, const QString &msg);
    void javaScriptConsoleMessage(const QString &message, int lineNumber, const QString &sourceID);
    QString userAgentForUrl(const QUrl &url) const;

private:
    QString m_userAgent;
    friend class Chimera;
};

class Chimera : public QObject {
    Q_OBJECT
    Q_PROPERTY(QString content READ content WRITE setContent)
    Q_PROPERTY(QString loadStatus READ loadStatus)
    Q_PROPERTY(QString state READ state WRITE setState)
    Q_PROPERTY(QString userAgent READ userAgent WRITE setUserAgent)
    Q_PROPERTY(QVariantMap viewportSize READ viewportSize WRITE setViewportSize)

public:
    Chimera(QObject *parent = 0);

    QString content() const;
    void setContent(const QString &content);

    void execute(const QString &fileName);
    int returnValue() const;

    QString loadStatus() const;

    void setState(const QString &value);
    QString state() const;

    void setUserAgent(const QString &ua);
    QString userAgent() const;

    void setViewportSize(const QVariantMap &size);
    QVariantMap viewportSize() const;

public slots:
    void exit(int code = 0);
    void open(const QString &address);
    bool render(const QString &fileName);
    void sleep(int ms);

private slots:
    void inject();
    void finish(bool);

private:
    QString m_loadStatus;
    WebPage m_page;
    int m_returnValue;
    QString m_script;
    QString m_state;
};

#endif
