import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Avatar} from 'react-native-elements';
import * as firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';


const InfoUser = (props) =>{
  const{userInfo, userInfo:{ uid, displayName, email, photoURL}} = props;
  const changeAvatar = async () => {
    const resultPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const resultPermissionCamera = resultPermissions.permissions.cameraRoll.status;

    if(resultPermissionCamera === "denied"){
      console.log("permissions not accepted")
    } else{
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4,3]
      });

      if(result.cancelled) {
        console.log("images gallery closed");
      } else {
        uploadImage(result.uri, uid);
      }
    }
  };

  const uploadImage = (uri, namedImage) => {
    console.log(`URI ${uri}`);
    console.log(`namedImage ${namedImage}`)
  };
  return(
    <View style={styles.viewUserInfo}>
      <Avatar
        rounded
        size="large"
        showEditButton
        onEditPress={changeAvatar}
        containerStyle={styles.viewUserInfoAvatar}
        source={{
          uri: photoURL
            ? photoURL
            : "https://api.adorable.io/avatars/266/abott@adorable.png"
        }}
      />
      <View>
        <Text style={styles.displayName}>
          {displayName ? displayName : "Anonymous"}
        </Text>
        <Text>{email ? email : "Social Login"}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 30,
    paddingBottom: 30,
  },
  viewUserInfoAvatar: {
    marginRight: 20,
  },
  displayName: {
    fontWeight: "bold",
  }

});

export default InfoUser;

