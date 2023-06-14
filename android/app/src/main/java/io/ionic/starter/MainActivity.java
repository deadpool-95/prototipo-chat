package io.ionic.starter;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.notification.services.NotificationServicesPlugin;

public class MainActivity extends BridgeActivity {

    public void onCreate(Bundle savedInstanceState){
      super.onCreate(savedInstanceState);
      registerPlugin(NotificationServicesPlugin.class);
    }
}
