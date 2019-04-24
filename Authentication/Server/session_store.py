import os, base64

class SessionStore:

	def __init__(self):
		self.sessions = {}	#master Dictionary of session store
		return

	def generateSessionId(self):
		rnum = os.urandom(32)	# create really true random data. 32 bite chunk of data
		rstr = base64.b64encode(rnum).decode("utf-8")
		return rstr

	def createSession(self):
		sessionId = self.generateSessionId() #create new session id
		print("Generated new session with ID: ", sessionId)
		self.sessions[sessionId] = {}	# creates empty place for new session
		return sessionId

	def getSessionData(self, sessionId):
		if sessionId in self.sessions:
			return self.sessions[sessionId]
		else:
			return None
