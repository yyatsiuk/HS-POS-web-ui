import PropTypes from 'prop-types';
import {Card, CardHeader, Divider} from '@material-ui/core';
import {OrderSummary} from './order-summary';
import {useTranslation} from "react-i18next";

export const OrderLineItems = (props) => {
  const { order, ...other } = props;
  const {t} = useTranslation();

  return (
    <Card
      variant="outlined"
      {...other}
    >
      <CardHeader title={t("Line Items")} />
      <Divider />
      <OrderSummary order={order} />
    </Card>
  );
};

OrderLineItems.propTypes = {
  order: PropTypes.object
};
