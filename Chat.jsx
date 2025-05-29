import React from 'react';
import { ChatEngine } from 'react-chat-engine';

function Chat() {
	return (
		<div className='container rounded bordered'>
		<ChatEngine
			projectID='e2ef1309-14da-4691-86ad-e4108d378972'
			userName='ashishkalyan@gmail.com'
			userSecret='Ashish@123'
			height='100vh'
		/>
		</div>
	);
}
export default Chat;
