package org.graylog.plugin.filter.geoipresolver;

import org.graylog2.plugin.PluginConfigBean;
import org.graylog2.plugin.PluginModule;

import java.util.Collections;
import java.util.Set;

public class GeoIpResolverFilterModule extends PluginModule {

    @Override
    public Set<? extends PluginConfigBean> getConfigBeans() {
        return Collections.emptySet();
    }

    @Override
    protected void configure() {
        addMessageFilter(GeoIpResolverFilter.class);
        addConfigBeans();
    }
}
