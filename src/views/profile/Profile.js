import React, { useState, useEffect } from "react";
import { getProfile } from "3box/lib/api";
import { useWeb3Context } from "web3-react";

import { get } from "../../util/requests";
import DaoList from "../../components/daoList/DaoList";
import ApplicationShortList from "../../components/applicationList/ApplicationShortList";

const Profile = props => {
  const context = useWeb3Context();
  const [molochs, setMolochs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (context.account === props.match.params.account) {
        const daoRes = await get(`moloch/`);
        setMolochs(
          daoRes.data.filter(moloch => {
            return moloch.summonerAddress === context.account;
          })
        );

        const applicationRes = await get(`applications/${context.account}`);
        setApplications(applicationRes.data);
      }

      const profile = await getProfile(props.match.params.account);
      console.log("profile", profile);
      setProfile(profile);
    };

    fetchData();
  }, [context.account, props.match.params.account]);

  return (
    <div className="View">
      <h1>Profile</h1>
      <p>{props.match.params.account}</p>
      {context.account === props.match.params.account && (
        <a href="https://3box.io/hub" target="_blank" rel="noreferrer noopener">
          Manage/Create profile
        </a>
      )}

      {/* {profile.image && profile.image[0] ? (
        <img src={profile.image[0].contentUrl} alt="profile" />
      ) : null} */}

      {profile.name ? (
        <p>
          {profile.emoji ? <span>{profile.emoji} </span> : null}
          {profile.name}
        </p>
      ) : null}

      {profile.website ? (
        <a href={profile.website} target="_blank" rel="noreferrer noopener">
          {profile.website}
        </a>
      ) : null}

      {molochs.length ? (
        <>
          <h2>Summoner of these Molochs</h2>
          <DaoList daos={molochs} />
        </>
      ) : null}

      {applications.length ? (
        <>
          <h2>I have applied to these Molochs</h2>
          <ApplicationShortList applications={applications} />
        </>
      ) : null}
    </div>
  );
};

export default Profile;