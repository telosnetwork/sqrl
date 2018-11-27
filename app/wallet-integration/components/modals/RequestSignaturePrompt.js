import React, { Component } from 'react';
import { Modal, Header, Icon } from 'semantic-ui-react';
import { I18n } from 'react-i18next';
import ReactJson from 'react-json-view';

const resolveSentenceConditions = (translated, condition) => {
  let doneResolving = true;
  const acc = [];
  translated.sentence.forEach((v) => {
    if( typeof v == "object" ){
      if(condition(v)){
        v.value.forEach(vv =>{
          acc.push(vv)
          doneResolving = typeof vv !== "object";
        });
      }
    }else{
      acc.push(v);
    }
  });
  translated.sentence = acc;
  return doneResolving;
}

const knownTypes = {
  "eosio.newaccount": true,
  "eosio.buyrambytes": true,
  "eosio.buyram": true,
  "eosio.sellram": true,
  "eosio.delegatebw": { "transform": (index, style, msg, _translated) => {
    const translated = {
      params: _translated.params,
      sentence: _translated.sentence
    }
    const actionToSelf = msg.data.from === msg.data.receiver;
    const condition = (v)=>{
      return !actionToSelf && ((v.condition === "transfer1" && msg.data.transfer) || (v.condition == "transfer0" && !msg.data.transfer));
    }
    while(!resolveSentenceConditions(translated, condition));
    return defaultDataToSentence(index, style, msg, translated);
  }},
  "eosio.undelegatebw": { "transform": (index, style, msg, _translated) => {
    const translated = {
      params: _translated.params,
      sentence: _translated.sentence
    }
    const actionToSelf = msg.data.from === msg.data.receiver;
    const condition = (v)=>{
      return !actionToSelf;
    }
    while(!resolveSentenceConditions(translated, condition));
    return defaultDataToSentence(index, style, msg, translated);
  }},
  "eosio.regproducer": true,
  "eosio.unregprod": true,
  "eosio.voteproducer": { "transform": (index, style, msg, _translated) => {
    const translated = {
      params: _translated.params,
      sentence: _translated.sentence
    }
    const condition = (v)=>{
      return ( 
        (v.condition === "reset" && !msg.data.proxy && !msg.data.producers.length) || 
        (v.condition === "setProxy" && msg.data.proxy) ||
        (v.condition === "voteProds" && msg.data.producers.length)
      )
    }
    while(!resolveSentenceConditions(translated, condition));
    return defaultDataToSentence(index, style, msg, translated);
  }},
  "eosio.token.transfer": true
};

const display = (data) => {
  data = data || '';
  return typeof data == "object" || typeof data == "function" ? JSON.stringify(data,null,1).replace(/\r?\n|\r/g,'') : data;
}

const defaultDataToSentence = (index, style, msg, translated) => {
  return (
    <li key={index} style={{paddingBottom:"5px"}}>
      {translated.sentence.map( (v, idx) => {
        if(typeof v == "number")
          if(v >= 0)
            return <span key={index+"-"+idx} style={{fontWeight:"bold",padding:"0px 1px"}}>{display(msg.data[translated.params[v]])}</span>
          else
            return <span key={'ath'+index} style={style}>
              {msg.authorization.map(auth => auth.actor+'@'+auth.permission).join(', ')}
            </span>

        return display(v);
      })}
    </li>
  )
}

const unknownTypeDataToSentence = (index, style, msg, translated) => {
  return (
    <li key={index} style={{paddingBottom:"5px"}}>
      {translated.sentence.map( (v, idx) => {
        if(typeof v == "number")
          if( v >= 0 )
            if(translated.params[v] == "data")
              return Object.keys(msg.data).map((k,id) => {
                return <React.Fragment key={"kv"+index+"-"+idx+"-"+id}>
                  <span style={{color:"#796139", paddingLeft:"10px"}}>{k}: </span> 
                  <span style={{fontWeight:"bold",padding:"0px 2px"}}>{display(msg.data[k])}</span>
                </React.Fragment>
              })
            else
              return <span key={"kv"+index+"-"+idx} style={{fontWeight: "bold"}}>{msg[translated.params[v]]}</span>
          else
            return <span key={'ath'+index} style={style}>
              {msg.authorization.map(auth => auth.actor+'@'+auth.permission).join(', ')}
            </span>
        else
          return v;
      })}
    </li>
  )
}

export default class RequestSignaturePrompt extends Component<Props> {

  extractInfo = (request, payload) => {
    const result = {
      app: request.origin || payload.origin || 'Unknown',
      summary: [],
      breakdown: []
    };

    payload.messages.forEach(msg => {
      result.summary.push(["wapii_sign_summary."+msg.code+"."+msg.type, msg.type+"/"+msg.code]);
      if(knownTypes[msg.code+"."+msg.type]){
        result.breakdown.push(
          Object.assign({
            params: knownTypes[msg.code+"."+msg.type].params, 
            transform: knownTypes[msg.code+"."+msg.type].transform || defaultDataToSentence,
            known:"wapii_sign_breakdown."+msg.code+"."+msg.type
          }, msg)
        );
      }else{
        result.breakdown.push(
          Object.assign({
            transform: unknownTypeDataToSentence,
            known: "wapii_sign_breakdown_unknown"
          }, msg));
      }
    });

    return result;
  }

  render() {
      const {
        error,
        request,
        payload
      } = this.props;
      const style = {
        fontWeight: "bold",
        padding: "0px 2px"
        // border: "1px dotted #d67d0e",
        // background: "#F9F2EE"
      }

      const collapsed = 1;
      const messages = {"raw transaction":payload.transaction, "readable transaction":payload.messages};
      const info = this.extractInfo(request, payload);

      return (
        <I18n ns="wapii">
          {
            (t) => (
              <React.Fragment>
                <Header icon="unlock" content={t('wapii_prompt_header_sign')} />
                <Modal.Content>
                  
                  {t("wapii_sign_description.0")}
                  <span style={style}>{info.app}</span>
                  {t("wapii_sign_description.1")}
                  
                  <span style={style}>
                    {info.summary.map(m=>t(m)).join(',  ')}
                  </span>
                  
                  <br/><br/>

                  {t("wapii_sign_breakdown_header")}
                  <ol>
                    {info.breakdown.map((msg, index) => {
                      return msg.transform(index, style, msg, t(msg.known, { returnObjects: true }))
                    })}
                  </ol>

                  {t("wapii_sign_chain.0")}
                  <span style={style}>
                    {payload.network.blockchain}
                  </span> 
                  {t("wapii_sign_chain.1")}
                  <span style={style}>
                    {payload.network.protocol + "://" + payload.network.host + ":" + payload.network.port}
                  </span> 
                  {t("wapii_sign_chain.2")}
                  <span style={style}>
                    {payload.network.chainId}
                  </span>
                  {t("wapii_sign_chain.3")}

                  <br/>
                  <br/>

                  {t("wapii_sign_reqid")}
                  <br/>
                  <span style={{color:"#796139", paddingRight:"10px"}}>appkey:</span> {request.appkey}
                  <br/>
                  <span style={{color:"#796139", paddingRight:"10px"}}>nonce:</span> {request.nonce}
                  
                  <br/>
                  
                  {error}
                  
                  <br/>
                  
                  <span style={{fontWeight:"bold", fontSize:"1.1em"}}>{t("wapii_json_details")}</span> 
                  <ReactJson
                      displayDataTypes={false}
                      displayObjectSize={false}
                      iconStyle="square"
                      name={null}
                      src={messages}
                      style={{ padding: '1em' }}
                      theme="harmonic"
                      collapsed={collapsed}
                      />
                  

                </Modal.Content>
              </React.Fragment>
            )
          }
        </I18n>
      );
  }
}