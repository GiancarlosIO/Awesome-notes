import React, { Component } from 'react';
import Radium from 'radium';
import Container from '../../grid/container';
import Column from '../../grid/column';
import Benefit from './benefit';

const styles = {
  base: {
    minHeight: '250px'
  }
}

class BenefitsSection extends Component {
  render() {
    return (
      <Container row extraStyles={styles.base} yCenter>
        <Column width={2} minWidth="250px">
          <Benefit
            title="Benefit 1"
            paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tortor turpis"
          />
        </Column>
        <Column width={2} minWidth="250px">
          <Benefit
            title="Benefit 2"
            paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tortor turpis"
          />
        </Column>
        <Column width={2} minWidth="250px">
          <Benefit
            title="Benefit 3"
            paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tortor turpis"
          />
        </Column>
        <Column width={2} minWidth="250px">
          <Benefit
            title="Benefit 4"
            paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tortor turpis"
          />
        </Column>
      </Container>
    )
  }
}

export default Radium()(BenefitsSection);