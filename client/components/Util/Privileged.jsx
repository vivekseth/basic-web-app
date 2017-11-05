import React from 'react';
import AsyncData from './AsyncData.jsx'

// 3 props: 
// - Success (required)
// - Fail
// - Loading

const Privileged = (props) => {
  // TODO(vivek): might need this to actually return null. 

  const _Null = (props)=>{return <span />};
  const _Loading = (props.Loading ? props.Loading : _Null);
  const _Fail = (props.Fail ? props.Fail : _Null);
  const _Success = props.Success

  return (
    <AsyncData 
      apiURL='/api/user/'
      IsLoading={(props) => {
        return <_Loading isPrivileged={false}/>;
      }}
      NoData={(props) => {
        return <_Fail isPrivileged={false}/>
      }}
      HasData={(props) => {
        if (props.data && props.data.success && props.data.data && props.data.data.username) {
          return <_Success userData={props.data.data} isPrivileged={true} />
        }
        else {
          return <_Fail isPrivileged={false} />
        }
      }}
    />
  );
}

export default Privileged;