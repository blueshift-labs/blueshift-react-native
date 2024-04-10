def blueshift_sdk_post_install(installer)
  target_name = 'BlueShift-iOS-SDK-BlueShift-iOS-SDK_BlueShift_iOS_SDK'
  installer.pods_project.targets.each do |target|
    if target.name == target_name
      target.build_configurations.each do |config|
        config.build_settings['CODE_SIGNING_REQUIRED'] = 'NO'
        config.build_settings['CODE_SIGNING_ALLOWED'] = 'NO'
      end
    end
  end
end
