/*
Copyright 2024 Comcast Cable Communications Management, LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

SPDX-License-Identifier: Apache-2.0
*/

/*
Adapts material from multiple-cucumber-html-reporter which is:
Copyright (c) 2023 Wasiq Bhamla
Licensed under the MIT License
*/

$('.x_title').on('click', function () {
  const $BOX_PANEL = $(this).closest('.x_panel'),
    $ICON = $(this).find('.collapse-link i'),
    $BOX_CONTENT = $BOX_PANEL.find('.x_content');

  // fix for some div with hardcoded fix class
  if ($BOX_PANEL.attr('style')) {
    $BOX_CONTENT.slideToggle(200, function () {
      $BOX_PANEL.removeAttr('style');
    });
  } else {
    $BOX_CONTENT.slideToggle(200);
    $BOX_PANEL.css('height', 'auto');
  }

  $ICON.toggleClass('fa-chevron-up fa-chevron-down');
});

$('body').tooltip({
  selector: '[data-toggle="tooltip"]',
});

hideResult = (resultId) => {
  $('span[class*=step]').closest('div.x_panel[style]').hide();
  $('span[class*=' + resultId + ']')
    .closest('div.x_panel[style]')
    .show();
};

showAll = () => {
  $('span[class*=step]').closest('div.x_panel[style]').show();
};

attachScreenshotLinks = () => {
  // Define regular expression to match the img URL pattern
  const imgPattern = /Screenshot:\s*(https:\/\/[^\s]+\.jpg)/g;
  const urlPattern = /(https:\/\/[^\s]+)/g; // For general URLs
  // Get all the div elements in the document
  const divElements = document.querySelectorAll('div');

  // Loop through the div elements to find any that contain the imagePattern
  divElements.forEach((div) => {
    const divHTML = div.innerHTML;
    const matches = divHTML.match(imgPattern);

    // If there's a match, get the id of the div
    if (matches) {
      const parentDivId = div.id;

      if (parentDivId) {
        // Find the <a> tag that references this div via the href attribute
        const toggleLink = document.querySelector(`a[href="#${parentDivId}"]`);

        if (toggleLink) {
          // Loop through each matching URL
          matches.forEach((url) => {
            const cleanUrl = url.replace('Screenshot: ', '');
            // Create new <a> tag
            const newLink = document.createElement('a');
            newLink.href = cleanUrl;
            newLink.target = '_blank';
            newLink.textContent = '+ Show Screenshot';
            newLink.style.margin = '0px 7px';

            // Insert link just after toggleLink
            toggleLink.parentNode.insertBefore(newLink, toggleLink.nextSibling);
          });
        }
      }
    }
  });
  // Process <pre> elements nested inside <div> for plain text URLs
  const preElements = document.querySelectorAll('div pre');

  // Loop through the div elements to find text that contain urlPattern
  preElements.forEach((pre) => {
    const preHTML = pre.innerHTML;
    if (urlPattern.test(preHTML)) {
      // Replace plain text URLs with clickable hyperlinks
      const updatedHTML = preHTML.replace(urlPattern, (url) => {
        let cleanedUrl = url;
        cleanedUrl = cleanedUrl.split(']')[0];
        return (
          '<a href="' + cleanedUrl + '" target="_blank" rel="noopener noreferrer">' + url + '</a>'
        );
      });
      pre.innerHTML = updatedHTML;
    }
  });
};

$(document).ready(() => {
  const status = ['passed', 'failed', 'pending', 'skipped', 'ambiguous', 'not-defined'];
  status.forEach((value) => {
    const menuItem = $('span[class*=' + value + '-background]');
    if (menuItem.length === 0) {
      $('#' + value)
        .parent()
        .addClass('disabled');
    }
  });
  attachScreenshotLinks();
});
