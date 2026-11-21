package es.carniceriarodri.calculadoraclara;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.graphics.Color;

public class MainActivity extends Activity {
    private WebView calculator;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        calculator = new WebView(this);
        calculator.setBackgroundColor(Color.WHITE);
        calculator.setWebViewClient(new WebViewClient());
        calculator.setWebChromeClient(new WebChromeClient());

        WebSettings settings = calculator.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(false);
        settings.setSupportZoom(false);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);

        setContentView(calculator);
        calculator.loadUrl("file:///android_asset/index.html");
    }

    @Override
    public void onBackPressed() {
        if (calculator != null && calculator.canGoBack()) {
            calculator.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
