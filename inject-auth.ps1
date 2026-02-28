$htmlFiles = Get-ChildItem -Path "." -Recurse -Filter "*.html"

foreach ($file in $htmlFiles) {
    if ($file.Name -eq "login.html" -or $file.Name -eq "Register.html") { continue }
    
    $content = Get-Content $file.FullName -Raw

    $content = $content.Replace("<span>Hi,</span>jordanb", "<span>Hi, </span><span class='display-name'>...</span>")
    $content = $content.Replace("jordanb's Profile", "<span class='display-name'>...</span>'s Profile")
    $content = $content.Replace("jordanb | `$0.00", "<span class='display-combined'>... | `$0.00</span>")
    $content = $content.Replace("jordanb's account", "<span class='display-name'>...</span>'s account")
    $content = $content.Replace('<p class="">jordanb</p>', "<p class='display-name'>...</p>")
    $content = $content.Replace('href="/logout"', 'href="#" class="logout-btn"')

    if (-not $content.Contains("auth-state.js")) {
        $content = $content.Replace('</body>', "`n    <script type=`"module`" src=`"/static/assets/jslogin/auth-state.js`"></script>`n</body>")
    }

    Set-Content -Path $file.FullName -Value $content
}
