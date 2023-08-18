# blueshift-react-native

Official React native plugin for integrating Blueshift's iOS and Android SDKs to your React native application.

## Installation

```sh
npm install blueshift-react-native
```


## Integration
Refer to the [react native integration](https://developer.blueshift.com/docs/install-and-get-started-with-blueshifts-react-native-plugin) guide to integrate the Blueshift SDK for Android and iOS..


## Usage
Import the Blueshift plugin in your JS/TS as mentioned below to use its functionality.

```js
import Blueshift from 'blueshift-react-native';
```

Once imported, you can call the Blueshift methods as mentioned below.

```js
// Make a call to Blueshift functions
Blueshift.setUserInfoEmailId("test@blueshift.com");
Blueshift.identifyWithDetails({"user_type":"premium"});

```

Refer to [these Blueshift JS methods](https://github.com/blueshift-labs/blueshift-react-native/blob/main/index.js) to know about features and methods supported by Plugin and how to use them. 

## Support

The primary and correct way to report an issue is via the customer support channel. Send us an email at support@blueshift.com from your work email with all the necessary details that contain step-by-step instructions on how to reproduce the issue.


## License

MIT
