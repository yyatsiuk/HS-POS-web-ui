import PropTypes from 'prop-types';
import {Button, Card, CardHeader, Divider} from '@material-ui/core';
import {OrderSummary} from './order-summary';
import {useTranslation} from "react-i18next";

export const OrderLineItems = (props) => {
  const { order, onEdit, ...other } = props;
  const {t} = useTranslation();

  return (
    <Card
      variant="outlined"
      {...other}
    >
      <CardHeader
          action={(
              <Button
                  color="primary"
                  variant="text"
                  onClick={onEdit}
              >
                {t("Edit")}
              </Button>
          )}
          title={t("Line Items")} />

      <Divider />
      <OrderSummary order={order} />
    </Card>
  );
};

OrderLineItems.propTypes = {
  order: PropTypes.object
};
