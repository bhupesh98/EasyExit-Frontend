import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { View, Card, XStack, H3, Paragraph, Separator, YStack, H5, H2, H4, H6, Dialog, Button } from 'tamagui';
import SvgQRCode from 'react-native-qrcode-svg';
import { CustomCardProps } from '@/interfaces/CustomCard';
import { TokenStatus } from '@/constants/TokenStatus';
import { toCapitalize } from '@/utils/toCapitalize';
import { colorName, iconName } from '@/constants/outPassStatus';

export default function CustomCard(props: CustomCardProps) {
  const [showQR, setShowQR] = React.useState<boolean>(false);

  return (
    <Card animation={'bouncy'} size={'$3'} bordered w={'100%'} my={'$2'} bg={'#fbfdff'}>
      <Card.Header padded>
        <XStack jc='space-between'>
          <View>
            <Ionicons name={iconName[props.status]} size={36} color={colorName[props.status]} />
            <H4 col={'$blue6Dark'}>{props.heading}</H4>
            <Paragraph theme='alt2'>
              <Paragraph>Start Time:</Paragraph> {props.startTime.toLocaleString()}
            </Paragraph>
            <Paragraph theme='alt2'>
              <Paragraph>End Time:</Paragraph> {props.endTime.toLocaleString()}
            </Paragraph>
          </View>
          {[TokenStatus.IN_USE, TokenStatus.ISSUED].includes(props.status) && (
            <View
              onPress={() => {
                setShowQR(true);
              }}
            >
              <SvgQRCode
                size={60}
                logoBorderRadius={10}
                color='#0e294b'
                ecl='M'
                backgroundColor='transparent'
                value={props.value}
                logoSize={24}
                logo={require('@/assets/icon.png')}
              />
            </View>
          )}
          <Dialog modal open={showQR}>
            <Dialog.Portal>
              <Dialog.Overlay key='overlay' opacity={0.5} enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
              <Dialog.Content
                width={'90%'}
                h={'50%'}
                bordered
                elevate
                key='content'
                enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
                exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                gap='$4'
                alignItems='center'
                jc='center'
              >
                <H4 fontWeight={'bold'}>Your OutPass QR</H4>
                <SvgQRCode
                  size={240}
                  logoBorderRadius={10}
                  color='#0e294b'
                  ecl='M'
                  backgroundColor='transparent'
                  value={props.value}
                  logoSize={24}
                  logo={require('@/assets/icon.png')}
                />
                <Dialog.Close asChild>
                  <Button
                    position='absolute'
                    onPress={() => setShowQR(false)}
                    top='$3'
                    right='$3'
                    size='$4'
                    circular
                    icon={props => <Ionicons name='close' size={24} color={props.color} />}
                  />
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog>
        </XStack>
      </Card.Header>
      {props.status !== TokenStatus.REQUESTED && (
        <>
          <Separator />
          <Card.Footer padded jc='space-between' ai='center'>
            <YStack>
              {props.status === TokenStatus.REJECTED && (
                <Paragraph col={'$red10'}>
                  Denial Reason: <Paragraph>{props.reason}</Paragraph>
                </Paragraph>
              )}
              <Paragraph theme='alt2'>
                {props.status === TokenStatus.REJECTED ?
                  toCapitalize(TokenStatus.REJECTED)
                : toCapitalize(TokenStatus.ISSUED)}{' '}
                by
              </Paragraph>
              <H6 theme='alt1'>{props.acceptedBy}</H6>
            </YStack>
            <Link href={`tel:+91 ${props.phoneNumber}`}>
              <Paragraph theme='alt2'>+91 {props.phoneNumber}</Paragraph>
            </Link>
          </Card.Footer>
        </>
      )}
    </Card>
  );
}
