import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Col, Row } from 'antd';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

import Modal from 'components/Modal';

import { DATE_FORMAT, TIME_FORMAT } from 'constant';
import AvatarDefault from 'resources/image/avatar-default.svg';
import { getFullUrl } from 'utils';
interface IProps {
  open: boolean;
  onClose: () => void;
  report: any;
}

const ModalReportDetail: React.FC<IProps> = ({ open, onClose, report }) => {
  const { t } = useTranslation();

  const renderUser = (user: any) => {
    return (
      <div className='user-avatar'>
        <Link to={`/user/${user?.id}`} target='_blank'>
          <img src={user?.avatar ? getFullUrl(user?.avatar) : AvatarDefault} alt='' className='w-10 h-10' />
          <div>
            <div className='displayname'>{user?.displayname}</div>
            <div className='username'>@{user?.username}</div>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <Modal open={open} onClose={onClose} title={t('modal.report_detail')} width={700} className='modal-detail-report'>
      <div className='report-id'>#{report?.id}</div>
      <Row>
        <Col span={8}>{t('modal.report_user')}</Col>
        <Col span={16}>{report?.email ? <span>{report?.email}</span> : renderUser(report?.reporter)}</Col>
      </Row>
      <br></br>
      <Row>
        <Col span={8}>{t('modal.report_date')}</Col>
        <Col span={16}>
          <span>{format(parseISO(report?.createdAt), DATE_FORMAT)}</span>{' '}
          <span>{format(parseISO(report?.createdAt), TIME_FORMAT)}</span>
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col span={8}>{t('modal.report_object')}</Col>
        <Col span={16}>
          {report?.userId ? (
            renderUser(report?.user)
          ) : (
            <Link to={`/video/${report?.video?.id}`} target='_blank'>
              {report?.video?.title}
            </Link>
          )}
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col span={8}>{t('modal.report_reason')}</Col>
        <Col span={16}>
          <span>{report?.reason}</span>
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col span={8}>{t('modal.report_comment')}</Col>
        <Col span={16}>
          <span>{report?.content || '--'}</span>
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalReportDetail;
