import { Controller } from '@hotwired/stimulus'

// Connects to data-controller="direct-upload"
export default class extends Controller {
  connect () {
    addEventListener('direct-upload:initialize', this.directUploadInitializeListener)
    addEventListener('direct-upload:start', this.directUploadStartListener)
    addEventListener('direct-upload:progress', this.directUploadProgressListener)
    addEventListener('direct-upload:error', this.directUploadErrorListener)
    addEventListener('direct-upload:end', this.directUploadEndListener)
  }

  disconnect () {
    removeEventListener('direct-upload:initialize', this.directUploadInitializeListener)
    removeEventListener('direct-upload:start', this.directUploadStartListener)
    removeEventListener('direct-upload:progress', this.directUploadProgressListener)
    removeEventListener('direct-upload:error', this.directUploadErrorListener)
    removeEventListener('direct-upload:end', this.directUploadEndListener)
  }

  directUploadInitializeListener (event) {
    const { target, detail } = event
    const { id, file } = detail
    target.insertAdjacentHTML('beforebegin', `
    <div id="direct-upload-${id}" class="direct-upload direct-upload--pending">
      <div id="direct-upload-progress-${id}" class="direct-upload__progress" style="width: 0%"></div>
      <span class="direct-upload__filename"></span>
    </div>`)
    target.previousElementSibling.querySelector('.direct-upload__filename').textContent = file.name
  }

  directUploadStartListener (event) {
    const { id } = event.detail
    const element = document.getElementById(`direct-upload-${id}`)
    element.classList.remove('direct-upload--pending')
  }

  directUploadProgressListener (event) {
    const { id, progress } = event.detail
    const progressElement = document.getElementById(`direct-upload-progress-${id}`)
    progressElement.style.width = `${progress}%`
  }

  directUploadErrorListener (event) {
    event.preventDefault()
    const { id, error } = event.detail
    const element = document.getElementById(`direct-upload-${id}`)
    element.classList.add('direct-upload--error')
    element.setAttribute('title', error)
  }

  directUploadEndListener (event) {
    const { id } = event.detail
    const element = document.getElementById(`direct-upload-${id}`)
    element.classList.add('direct-upload--complete')
  }

  submit (event) {
    // it works if we programatically click the submit
    // event.currentTarget.closest('form').querySelector('input[type=submit]').click()
    // doesn't work if we requestSubmit
    event.currentTarget.closest('form').requestSubmit()
  }
}
