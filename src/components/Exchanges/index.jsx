import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import { useGetExchangesQuery } from '../../services/cryptoApi';
import Loader from '../Loader'

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
    const { data, isFetching } = useGetExchangesQuery();
    const exchangesList = data?.data?.exchanges;

    // Note: To access this endpoint you need premium plan
    if (isFetching) return <Loader></Loader>;

    return (
        <>
            <Row>
                <Col span={6}>Exchanges</Col>
                <Col span={6}>Price</Col>
                <Col span={6}>Markets</Col>
                <Col span={6}>UUID</Col>
            </Row>
            <Row>
                {exchangesList.map((exchange) => (
                    <Col span={24} key={exchange.uuid}>
                        <Collapse>
                            <Panel
                                key={exchange.uuid}
                                showArrow={false}
                                header={(
                                    <Row key={exchange.uuid} style={{ width: "100%" }} >
                                        <Col span={6}>
                                            <Text><strong>{exchange.rank}.</strong></Text>
                                            <Avatar className="exchange-image" src={exchange.iconUrl} />
                                            <Text><strong>{exchange.name}</strong></Text>
                                        </Col>
                                        <Col span={6}>$ {millify(exchange.price)}</Col>
                                        <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                                        <Col span={6}>{(exchange.uuid)}</Col>
                                    </Row>
                                )}
                            >

                                <b>Coin Ranking Url :  </b>
                                <a href="{exchange.coinrankingUrl}">{exchange.coinrankingUrl}</a>
                            </Panel>
                        </Collapse>
                    </Col>
                ))
                }
            </Row >
        </>
    );
};

export default Exchanges;