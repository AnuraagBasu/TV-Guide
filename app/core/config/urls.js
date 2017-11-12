const baseURL = "http://ams-api.astro.com.my";

export const getChannelList = () => {
	return baseURL + "/ams/v3/getChannelList";
};

export const getChannelDetails = ( channelIds = [] ) => {
	channelIds = channelIds.join( "," );
	return baseURL + "/ams/v3/getChannels?channelId=" + channelIds;
};