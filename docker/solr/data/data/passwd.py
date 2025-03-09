import hashlib
import base64

# echo -n "password" | openssl dgst -sha256 -binary | openssl base64

password = "password"
hash_bytes = hashlib.sha256(password.encode()).digest()
hash_str = base64.b64encode(hash_bytes).decode()
print(hash_str)