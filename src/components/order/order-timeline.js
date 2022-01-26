import {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Typography} from '@material-ui/core';
import {Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem} from '@material-ui/lab';
import {Check as CheckIcon} from '../../icons/check';
import {useTranslation} from "react-i18next";

const getDotStyles = (value) => {
  if (value === 'complete') {
    return {
      backgroundColor: 'success.main',
      borderColor: 'success.main',
      color: 'success.contrastText'
    };
  }

  if (value === 'active') {
    return {
      backgroundColor: 'neutral.200',
      borderColor: 'neutral.200',
      color: 'text.secondary'
    };
  }

  return {
    backgroundColor: 'inherit',
    borderColor: 'neutral.300',
    color: 'text.secondary'
  };
};

// NOTE: Items should be generated on order data to display information such as ordered date
const getItems = (status) => {
  const statusMapping = ['PLACED', 'IN_PROGRESS', 'READY_FOR_SHIPMENT', 'SHIPPED', 'DELIVERED', 'COMPLETE', 'RETURNED'];
  const currentStatusIndex = statusMapping.indexOf(status) + 1;
  const items = [
    { title: 'Placed at' },
    { title: 'In Progress' },
    { title: 'Ready' },
    { title: 'Shipped' },
    { title: 'Delivered' },
    { title: 'complete' }
  ];

  return items.map((item, index) => {
    if (currentStatusIndex > index) {
      return { ...item, value: 'complete' };
    }

    if (currentStatusIndex === index) {
      return { ...item, value: 'active' };
    }

    return { ...item, value: 'inactive' };
  });
};

export const OrderTimeline = (props) => {
  const { status, createdAt, ...other } = props;
  const items = getItems(status);
  const {t} = useTranslation();

  return (
    <Timeline
      sx={{
        my: 0,
        p: 0
      }}
      {...other}
    >
      {items.map((item, index) => (
        <Fragment key={item.title}>
          <TimelineItem
            sx={{
              alignItems: 'center',
              minHeight: 'auto',
              '&::before': {
                display: 'none'
              }
            }}
          >
            <TimelineDot
              sx={{
                ...(getDotStyles(item.value)),
                alignSelf: 'center',
                boxShadow: 'none',
                flexShrink: 0,
                height: 36,
                width: 36,
                m: 0
              }}
              variant={(item.value === 'complete' || item.value === 'active')
                ? 'filled'
                : 'outlined'}
            >
              {(item.value === 'complete' || item.value === 'active')
              && <CheckIcon />}
            </TimelineDot>
            <TimelineContent>
              <Typography
                color={(item.value === 'complete' || item.value === 'active')
                  ? 'textPrimary'
                  : 'textSecondary'}
                variant="overline"
              >
                {item.title === 'Placed at' ? t(item.title, {date: createdAt}) : t(item.title)}
              </Typography>
            </TimelineContent>
          </TimelineItem>
          {items.length > index + 1 && (
            <TimelineConnector
              sx={{
                backgroundColor: 'neutral.200',
                height: 22,
                ml: 2.25,
                my: 1
              }}
            />
          )}
        </Fragment>
      ))}
    </Timeline>
  );
};

OrderTimeline.propTypes = {
  status: PropTypes.oneOf(['PLACED', 'IN_PROGRESS', 'READY_FOR_SHIPMENT', 'SHIPPED', 'DELIVERED', 'COMPLETE', 'RETURNED']).isRequired,

  createdAt: PropTypes.object.isRequired
};
