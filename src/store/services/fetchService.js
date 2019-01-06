import firebase from "firebase";

const projectId = "super-smash-matchups";

var config = {
    apiKey: "AIzaSyDUAeMJRPkI2Rn5cgujTRzWupryJmo-J4o",
    authDomain: `${projectId}.firebaseapp.com`,
    databaseURL: `${projectId}.firebaseio.com`,
    storageBucket: `${projectId}.appspot.com`
};
firebase.initializeApp(config);

export const fetch = data => {
    const { arr } = data.payload;

    return new Promise((resolve, reject) => {
        const storage = firebase.storage().ref();

        const imgUrl = [];
        for (let key in arr) {
            const storageRef = storage.child(`img/${arr[key].name}.png`);

            storageRef
                .getDownloadURL()
                .then(function(url) {
                    imgUrl.push({ key: arr[key].name, url: url });
                    // console.log({ url, imgUrl });
                })
                .catch(function(error) {
                    console.log({ error });
                    return reject({ ...error, error: true });
                });
        }
        return resolve({ url: imgUrl, error: false });
    });
};
