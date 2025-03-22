import * as ImageManipulator from 'expo-image-manipulator'
import * as ImagePicker from 'expo-image-picker'

const selectImageFromGallery = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.2,
    selectionLimit: 1
  })

  if (result.canceled || !result.assets[0]) {
    return
  }

  const context = ImageManipulator.ImageManipulator.manipulate(
    result.assets[0].uri
  )

  const img = await context.resize({ height: 256, width: 256 }).renderAsync()

  return await img.saveAsync({
    format: ImageManipulator.SaveFormat.WEBP,
    base64: true
  })
}

export default selectImageFromGallery
