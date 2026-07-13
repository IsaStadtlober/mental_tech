import React from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';

import { SuccessScreen } from '../../components/SuccessScreen';
import { styles } from '../../styles/styles';

export default function PasswordSentRoute() {
  const router = useRouter();

  return (
    <SuccessScreen
      eyebrow="E-mail enviado"
      title="Verifique sua caixa de entrada"
      description="Enviamos um link de recuperação para o e-mail informado."
      onBack={() => router.back()}
      footer={
        <View style={styles.sentNoticeBox}>
          <Text style={styles.sentNoticeTitle}>Aviso importante</Text>

          <Text style={styles.sentNoticeText}>
            O link pode levar alguns minutos para chegar. Se não encontrar, confira também o spam ou lixo eletrônico.
          </Text>
        </View>
      }
    />
  );
}