# get workflow environment variable from Alfred
cacheHours="${cacheHours}"
cacheFilePath="${cacheFilePath}"


>&2 echo "Checking: '$cacheFilePath'"

# Expand tilde manually since it doesn't expand inside quotes
expandedPath="${cacheFilePath/#\~/$HOME}"

if [ -f "$expandedPath" ]; then
    # Get file modification time and current time in seconds since epoch
    fileMtime=$(stat -f "%m" "$expandedPath")
    currentTime=$(date +%s)
    ageSeconds=$(( currentTime - fileMtime ))
    thresholdSeconds=$(( cacheHours * 60 *60 ))

    if [ "$ageSeconds" -lt "$thresholdSeconds" ]; then
        >&2 echo "Cache is fresh (${ageSeconds}s old, threshold: ${thresholdSeconds}s)"
    else
        >&2 echo "Cache is stale (${ageSeconds}s old, threshold: ${thresholdSeconds}s)"
        osascript -e 'tell application id "com.runningwithcrayons.Alfred" to run trigger "reload" in workflow "wacharamanotham.chatchavan.alfred.gotomailbox"'
    fi
else
    >&2 echo "Cache file does not exist"
fi