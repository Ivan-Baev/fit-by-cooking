import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import React from 'react';

function MapComponent() {
	const containerStyle = {
		width: '100%',
		height: '90%',
	};

	const center = {
		lat: 42.67205301581569,
		lng: 23.3231057,
	};

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: 'AIzaSyBUQq2PuspRxi5AJXXi-T3sbb5lZ7EvnN0',
	});

	const [map, setMap] = React.useState(null);

	const onLoad = React.useCallback(function callback(map) {
		const zoom = 17.5;
		map.setZoom(zoom);

		setMap(map);
	}, []);

	const onUnmount = React.useCallback(function callback(map) {
		setMap(null);
	}, []);

	return isLoaded ? (
		<GoogleMap mapContainerStyle={containerStyle} center={center} onLoad={onLoad} onUnmount={onUnmount}>
			<Marker position={new window.google.maps.LatLng(center.lat, center.lng)} />
		</GoogleMap>
	) : (
		<></>
	);
}

export default React.memo(MapComponent);
