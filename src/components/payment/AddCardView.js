import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';

export default class AddCardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cardData: { valid: false } };
  }

  render() {
    const { onSubmit, submitted, error } = this.props;

    return (
      <View>
        <View>
          <CreditCardInput requiresName onChange={(cardData) => this.setState({ cardData })} 
            labels={{number: 'Número', expiry: 'Expira', cvc: 'CVC', name: 'Nombre en tarjeta'}}
            placeholders={{number: '1234 5678 1234 5678', expiry: 'MM/YY', cvc: 'CVC', name: 'Nombre Completo en tarjeta'}}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title='Agregar Tarjeta'
            disabled={!this.state.cardData.valid || submitted}
            onPress={() => onSubmit(this.state.cardData)}
          />
          {/* Show errors */}
          {error && (
            <View style={styles.alertWrapper}>
              <View style={styles.alertIconWrapper}>
              </View>
              <View style={styles.alertTextWrapper}>
                <Text style={styles.alertText}>{error}</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  buttonWrapper: {
    padding: 10,
    zIndex: 100
  },
  alertTextWrapper: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  alertIconWrapper: {
    padding: 5,
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  alertText: {
    color: '#c22',
    fontSize: 16,
    fontWeight: '400'
  },
  alertWrapper: {
    backgroundColor: '#ecb7b7',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 5,
    paddingVertical: 5,
    marginTop: 10
  }
});