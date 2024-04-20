import React, { useState } from 'react';
import { StyleSheet, ImageBackground, View, TouchableOpacity, Text, Modal } from 'react-native';
import CustomTextInput2 from '@/components/CustomTextInput2';
import { H2, H4, H6 } from 'tamagui';
import { Image, Button, ButtonText } from 'tamagui';

export default function CreateAnnouncement() {
  const [topic, setTopic] = useState('');
  const [error, setError] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = () => {
    if (!topic || !description || !title) {
      setError(true);
    } else {
      setShowConfirmation(true);
    }
  };

  const handleSend = () => {
    // Implement your logic to send the notification
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <View style={{ backgroundColor: '#fbfdff', flex: 1 }}>
      <View style={styles.backgroundContainer}>
        <Image source={require('@/assets/images.jpeg')} style={styles.backgroundImage} />
        <View style={styles.overlay}>
          <H2 fontWeight={'bold'} col={'white'}>
            Create announcement
          </H2>
          <H4 col={'white'}>Update the organization</H4>
        </View>
      </View>
      <View style={styles.formContainer}>
        <CustomTextInput2
          value={topic}
          placeholder='Topic'
          onChangeText={text => {
            setTopic(text);
            setError(false);
          }}
          error={error}
          multiline={false}
        />
        <CustomTextInput2
          value={title}
          placeholder='Title'
          onChangeText={text => {
            setTitle(text);
            setError(false);
          }}
          error={error}
          multiline={false}
        />
        <CustomTextInput2
          value={description}
          placeholder='Description'
          onChangeText={text => {
            setDescription(text);
            setError(false);
          }}
          error={error}
          multiline={true} // Use multiline for longer description
        />

        {error && <H6 col='$red10'>Please fill out all the fields</H6>}

        <Button onPress={handleSubmit} w='100%' h='$5' mt='$5'>
          <ButtonText>Create Announcement</ButtonText>
        </Button>
      </View>

      {/* Confirmation Modal */}
      <Modal visible={showConfirmation} transparent>
        <TouchableOpacity activeOpacity={1} style={styles.modalContainer} onPress={() => setShowConfirmation(false)}>
          <View style={styles.modalContent}>
            <H4 fontWeight='bold' mb='$3'>
              Are you sure you want to send this notification?
            </H4>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                <Text style={{ color: 'white' }}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    height: '35%',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: '5%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  sendButton: {
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
  },
});
