(function($) {
  let currentPageName = null
  // const loadedStyles = []
  // const loadedScripts = []

  $(document).ready(function() {
    $('#main_panel li a').on('click', function() {
      const name = getAnchor(this.href)
      if (name !== '') { selectPage(name) }
    })
  })

  function getAnchor(href) {
    const matches = href.match(/#(.*)/)
    return (matches.length > 1 ? matches[1] : '')
  }

  function loadPage(name) {
    const $page = $('<div id="' + name + '_page" class="page"></div>')
    $('#main_view').append($page)
    $.ajax('tools/' + name + '.php', {
      type: 'GET',
    })
      .done(function(response, status, xhr) {
        let name = ''
        let styles = null
        let scripts = null
        let match = response.match(/^<!--\n([\s\S]+?)\n-->/)
        if (match && match.length > 1) {
          const data = match[1]
          match = data.match(/^name:(.+)/m)
          if (match && match.length > 1) { name = match[1] }
          match = data.match(/^styles:(.+)/m)
          if (match && match.length > 1) { styles = match[1].split(';') }
          match = data.match(/^scripts:(.+)/m)
          if (match && match.length > 1) { scripts = match[1].split(';') }
        }
        if (styles) { loadStyles(styles) }
        if (scripts) { loadScripts(scripts) }
        // alert(name + "\n" + styles + "\n" + scripts);
        $page.html(response)
      })
      .fail(function(xhr, status, error) {
        alert(error)
      })
  }

  function loadStyles(styles) {}

  function loadScripts(scripts) {}

  function showPage(name) {
    if (currentPageName === name) { return }
    if (currentPageName !== null) {
      $('#' + currentPageName + '_page').hide()
      $('#main_panel li a[href="#' + currentPageName + '"]').parent().removeClass('selected')
    }
    $('#' + name + '_page').show()
    $('#main_panel li a[href="#' + name + '"]').parent().addClass('selected')
    currentPageName = name
  }

  function selectPage(name) {
    const $page = $('#' + name + '_page')
    if (!$page.length) { loadPage(name) }
    showPage(name)
  }
})(window.jQuery)
