import { Role } from '@/constants/Role';
import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { H6, View, ScrollView, Paragraph, H4 } from 'tamagui';
import Avatar from '@/components/Avatar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'tamagui/linear-gradient';

const Profile = () => {
  const profile = {
    name: 'Bhupesh Dewangan',
    email: 'bhupeshdewangan20@gmail.com',
    unrestrictedStartTime: new Date().toLocaleTimeString(),
    unrestrictedEndTime: new Date().toLocaleTimeString(),
    phoneNumber: '+91 1234567890',
    role: Role.MANAGER,
    organization: 'IIITA',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1713X-yoPTqc3XMWhnQqczKaVoJjPbKbhRA&s',
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fbfdff' }}>
      <LinearGradient
        w={'100%'}
        h={'35%'}
        mt={'$-10'}
        zIndex={2}
        pos='absolute'
        borderRadius={'$10'}
        colors={['$red10', '$yellow10']}
        start={[0, 1]}
        end={[0, 0]}
        style={{
          transform: [{ rotate: '-20deg' }],
          // background: 'rgb(255,204,204)',
          // background: 'linear-gradient(90deg, rgba(255,204,204,1) 0%, rgba(255,153,153,1) 100%)',
        }}
      ></LinearGradient>
      <View w={'100%'} h={'20%'} mt='10%' ml='5%' pos='absolute' zi={4}>
        <H4 col={'white'}>{profile.name}</H4>
        <Paragraph col={'white'}>{profile.role}</Paragraph>
      </View>
      <View pos='absolute' ml={'58%'} mt={'20%'}>
        <Avatar w={120} h={120} zi={5} imageUri={profile.image} />
      </View>
      <ScrollView pos='absolute' top={'38%'} paddingHorizontal={15}>
        <View fd={'row'} gap={'$3'} ai='center' mb={'$3'}>
          <View
            style={{ width: 40, height: 40, boxShadow: '5px 5px 5px 5px rgba(0, 0, 255, .2)' }}
            jc='center'
            ai='center'
          >
            <Ionicons color={'#26b6e4'} name='school' size={30} />
          </View>
          <View gap={'$-2'}>
            <Paragraph col={'grey'}>Institute</Paragraph>
            <H6>{profile.organization}</H6>
          </View>
        </View>
        <View fd={'row'} gap={'$3'} ai='center' mb={'$3'}>
          <View style={{ width: 40, height: 40 }} jc='center' ai='center'>
            <Ionicons color={'#f7d02e'} name='mail' size={30} />
          </View>
          <View gap={'$-2'}>
            <Paragraph col={'grey'}>Email</Paragraph>
            <H6>{profile.email}</H6>
          </View>
        </View>
        <View fd={'row'} gap={'$3'} ai='center' mb={'$3'}>
          <View style={{ width: 40, height: 40 }} jc='center' ai='center'>
            <Ionicons color={'#000000'} name='call' size={30} />
          </View>
          <View gap={'$-2'}>
            <Paragraph col={'grey'}>Phone Number</Paragraph>
            <H6>{profile.phoneNumber}</H6>
          </View>
        </View>
        <View fd={'row'} gap={'$3'} ai='center' mb={'$3'}>
          <View style={{ width: 40, height: 40 }} jc='center' ai='center'>
            <Ionicons color={'#a873f7'} name='watch' size={30} />
          </View>
          <View gap={'$-2'}>
            <Paragraph col={'grey'}>Free Start Time</Paragraph>
            <H6>{profile.unrestrictedStartTime}</H6>
          </View>
        </View>
        <View fd={'row'} gap={'$3'} ai='center' mb={'$3'}>
          <View style={{ width: 40, height: 40 }} jc='center' ai='center'>
            <Ionicons color={'#3ebba7'} name='time' size={30} />
          </View>
          <View gap={'$-2'}>
            <Paragraph col={'grey'}>Free End Time</Paragraph>
            <H6>{profile.unrestrictedEndTime}</H6>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: '50%',
    backgroundColor: '#add8e6',
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
    zIndex: -1,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  profileCard: {
    marginVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 75,
    marginRight: 20,
  },
  basicInfo: {
    flex: 1,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
    color: 'black',
  },
  detailContainer: {
    marginBottom: 10,
  },
  detailBox: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 20,
    color: 'black',
    marginTop: 5,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0075CA2E',
    borderColor: '#35ABFF',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  roleBadgeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#35ABFF',
    marginLeft: 5,
  },
});

export default Profile;
