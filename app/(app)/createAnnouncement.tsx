import React, { useState } from 'react';
import { StyleSheet, ImageBackground, TouchableOpacity, Text, Modal } from 'react-native';
import CustomTextInput from '@/components/CustomTextInput';
import { H2, H4, H6 } from 'tamagui';
import { Image, Button, ButtonText, View } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <SafeAreaView style={{ backgroundColor: '#fbfdff', flex: 1 }}>
      <View h='35%' w={'100%'}>
        <ImageBackground source={require('@/assets/images.jpeg')} style={{ flex: 1 }}>
          <View style={styles.overlay}>
            <H2 fontWeight={'bold'} col={'white'}>
              Notification
            </H2>
            <H4 col={'white'}>Timely Updates for You</H4>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.formContainer}>
        <CustomTextInput
          value={topic}
          placeholder='Topic'
          onChangeText={text => {
            setTopic(text);
            setError(false);
          }}
          error={error}
        />
        <CustomTextInput
          value={title}
          placeholder='Title'
          onChangeText={text => {
            setTitle(text);
            setError(false);
          }}
          error={error}
        />
        <CustomTextInput
          value={description}
          placeholder='Description'
          onChangeText={text => {
            setDescription(text);
            setError(false);
          }}
          error={error}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    height: '35%',
  },
  backgroundImage: {
    flex: 1,
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
