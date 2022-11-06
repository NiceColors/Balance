import AsyncStorage from "@react-native-async-storage/async-storage"

const getSavedJWT = async () => {
    const jwt = AsyncStorage.getItem('@storage_Key')
    if (!jwt) {
        return false
    }
    else return jwt
}

export default getSavedJWT