package com.example.demo.config;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.SpringSecurityCoreVersion;

public final class SimpleGrantedAuthority implements GrantedAuthority {

	private static final long serialVersionUID = SpringSecurityCoreVersion.SERIAL_VERSION_UID;

    @Override
    public String getAuthority() {
        // TODO Auto-generated method stub
        return null;
    }
  }
