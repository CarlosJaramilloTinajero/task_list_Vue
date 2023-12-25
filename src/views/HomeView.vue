<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { notify, updateNotify } from '../notify';

const store = useStore();
const idNotify = ref(0);

const addList = ref(false);

const lists = computed(() => {
  return store.state.listTaskModule.lists;
});

const moveDivDown = idDiv => {
  let id = setTimeout(() => {
    let div = document.getElementById(idDiv);
    if (div) {
      div.scrollTop = div.scrollHeight;
    }
    window.clearTimeout(id);
  }, 200);
};

let editorModal = null;
// editorModal.setData(register.value);
// textEdit.value.value = editorModal.getData();

const optionsEditor = {
  // https://ckeditor.com/docs/ckeditor5/latest/features/toolbar/toolbar.html#extended-toolbar-configuration-format
  toolbar: {
    items: [
      // 'exportPDF', 'exportWord', '|',
      // 'findAndReplace', 'selectAll', '|',
      'heading', '|',
      'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', 'removeFormat', '|',
      'bulletedList', 'numberedList', 'todoList', '|',
      'outdent', 'indent', '|',
      // 'undo', 'redo',
      '-',
      'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|', '|',
      'link', 'insertImage', 'insertTable', '|',
      '|',
      '|',
    ],
    shouldNotGroupWhenFull: true
  },
  // Changing the language of the interface requires loading the language file using the <script> tag.
  // language: 'es',
  list: {
    properties: {
      styles: true,
      startIndex: true,
      reversed: true
    }
  },
  // https://ckeditor.com/docs/ckeditor5/latest/features/headings.html#configuration
  heading: {
    options: [
      { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
      { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
      { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
      { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
      { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
      { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
      { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
    ]
  },
  // https://ckeditor.com/docs/ckeditor5/latest/features/editor-placeholder.html#using-the-editor-configuration
  placeholder: 'Ingresa el texto',
  // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-family-feature
  fontFamily: {
    options: [
      'default',
      'Arial, Helvetica, sans-serif',
      'Courier New, Courier, monospace',
      'Georgia, serif',
      'Lucida Sans Unicode, Lucida Grande, sans-serif',
      'Tahoma, Geneva, sans-serif',
      'Times New Roman, Times, serif',
      'Trebuchet MS, Helvetica, sans-serif',
      'Verdana, Geneva, sans-serif'
    ],
    supportAllValues: true
  },
  // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-size-feature
  fontSize: {
    options: [10, 12, 14, 'default', 18, 20, 22],
    supportAllValues: true
  },
  // Be careful with the setting below. It instructs CKEditor to accept ALL HTML markup.
  // https://ckeditor.com/docs/ckeditor5/latest/features/general-html-support.html#enabling-all-html-features
  htmlSupport: {
    allow: [
      {
        name: /.*/,
        attributes: true,
        classes: true,
        styles: true
      }
    ]
  },
  // Be careful with enabling previews
  // https://ckeditor.com/docs/ckeditor5/latest/features/html-embed.html#content-previews
  htmlEmbed: {
    showPreviews: true
  },
  // https://ckeditor.com/docs/ckeditor5/latest/features/link.html#custom-link-attributes-decorators
  link: {
    decorators: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://',
      toggleDownloadable: {
        mode: 'manual',
        label: 'Downloadable',
        attributes: {
          download: 'file'
        }
      }
    }
  },
  // https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html#configuration
  mention: {
    feeds: [
      {
        marker: '@',
        feed: [
          '@apple', '@bears', '@brownie', '@cake', '@cake', '@candy', '@canes', '@chocolate', '@cookie', '@cotton', '@cream',
          '@cupcake', '@danish', '@donut', '@dragée', '@fruitcake', '@gingerbread', '@gummi', '@ice', '@jelly-o',
          '@liquorice', '@macaroon', '@marzipan', '@oat', '@pie', '@plum', '@pudding', '@sesame', '@snaps', '@soufflé',
          '@sugar', '@sweet', '@topping', '@wafer'
        ],
        minimumCharacters: 1
      }
    ]
  },
  // The "super-build" contains more premium features that require additional configuration, disable them below.
  // Do not turn them on unless you read the documentation and know how to configure them and setup the editor.
  removePlugins: [
    // These two are commercial, but you can try them out without registering to a trial.
    // 'ExportPdf',
    // 'ExportWord',
    'AIAssistant',
    'CKBox',
    'CKFinder',
    'EasyImage',
    // This sample uses the Base64UploadAdapter to handle image uploads as it requires no configuration.
    // https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/base64-upload-adapter.html
    // Storing images as Base64 is usually a very bad idea.
    // Replace it on production website with other solutions:
    // https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/image-upload.html
    // 'Base64UploadAdapter',
    'RealTimeCollaborativeComments',
    'RealTimeCollaborativeTrackChanges',
    'RealTimeCollaborativeRevisionHistory',
    'PresenceList',
    'Comments',
    'TrackChanges',
    'TrackChangesData',
    'RevisionHistory',
    'Pagination',
    'WProofreader',
    // Careful, with the Mathtype plugin CKEditor will not load when loading this sample
    // from a local file system (file://) - load this site via HTTP server if you enable MathType.
    'MathType',
    // The following features are part of the Productivity Pack and require additional license.
    'SlashCommand',
    'Template',
    'DocumentOutline',
    'FormatPainter',
    'TableOfContents',
    'PasteFromOfficeEnhanced'
  ]
};

const initCkeditor = () => {
  CKEDITOR.ClassicEditor.create(document.getElementById("editor-modal"), optionsEditor).then(newEditor => {
    editorModal = newEditor;
  })
    .catch(error => {
      console.error(error);
    });
};

const closeAllActions = () => {
  showMoveTarjetModal.value = false;
  showDatesTarjetModal.value = false;
};

const titleListForm = ref(null);

const taskForm = ref({
  title: '',
  task_list_id: null
});

const modalTask = ref({
  description: ''
});

const showMoveTarjetModal = ref(false);
const showDatesTarjetModal = ref(false);

const showInputTitleModal = ref(false);
const showEditorModal = ref(false);
const modalTaskTitle = ref(null);
const taskModalListId = ref(null);
const dueDateTaskModal = ref(null);

// Submits
const addListSubmit = async () => {
  try {
    if (!titleListForm.value) {
      notify('El titulo es necesario', 'error');
      return;
    }
    idNotify.value = notify('Cargando...', 'loading');

    const data = await store.dispatch('createList', { name: titleListForm.value });

    if (data && data.status) {
      updateNotify(idNotify.value, 'Lista creada correctamente', 'success');
      titleListForm.value = null;
      addList.value = false;
    } else {
      updateNotify(idNotify.value, 'Error al crear la lista', 'error');
    }
  } catch (error) {
    updateNotify(idNotify.value, 'Error', 'error');
  }
};

const addTaskSubmit = async () => {
  try {
    if (!taskForm.value.task_list_id || !taskForm.value.title) {
      notify('El titulo es requerido', 'error');
      return;
    }

    idNotify.value = notify('Cargando...', 'loading');
    const data = await store.dispatch('createTask', taskForm.value);
    if (data && data.status) {
      updateNotify(idNotify.value, 'Tarea creada correctamente', 'success');

      const dataList = await store.dispatch('getLists');

      if (dataList && dataList.status) {
        taskForm.value.task_list_id = null;
        taskForm.value.title = '';
      }
    } else {
      updateNotify(idNotify.value, 'Error al crear la tarea', 'error');
    }
  } catch (error) {
    updateNotify(idNotify.value, 'Error', 'error');
  }
}

const updateTaskModal = async () => {
  try {
    if (!modalTask.value || !modalTask.value.id) {
      notify('Error al actualizar la tarea', 'error');
      return;
    }

    if (showEditorModal.value) {
      modalTask.value.description = editorModal.getData();
    }

    idNotify.value = notify('Cargando...', 'loading');

    const data = await store.dispatch('updateTask', modalTask.value);

    if (data && data.status) {
      updateNotify(idNotify.value, 'Tarea actualizada correctamente', 'success');
      showEditorModal.value = false;
      editorModal.setData('');
    }
  } catch (error) {
    updateNotify(idNotify.value, 'Error al actualizar la tarea', 'error');
  }
};

const deleteTaskModal = async () => {
  try {
    if (!modalTask.value.id) {
      notify('Error al eliminar la tarea', 'error');
      return;
    }

    idNotify.value = notify('Cargando...', 'loading');

    const data = await store.dispatch('deleteTasks', modalTask.value.id);

    if (data && data.status) {
      updateNotify(idNotify.value, 'Tarea eliminada correctamente', 'success');
    } else {
      updateNotify(idNotify.value, 'Error al eliminar la tarea', 'error');
    }
  } catch (error) {
    updateNotify(idNotify.value, 'Error al eliminar la tarea', 'error');
  }
};

const deleteList = async id => {
  try {
    idNotify.value = notify('Cargando...', 'loading');

    const data = await store.dispatch('deleteList', id);

    if (data && data.status) {
      updateNotify(idNotify.value, 'Lista eliminada correctamente', 'success');
    } else {
      updateNotify(idNotify.value, 'Error al borrar la lista', 'error');
    }
  } catch (error) {
    updateNotify(idNotify.value, 'Error al borrar la lista', 'error');
  }
};

const emptyList = async id => {
  try {

    idNotify.value = notify('Cargando...', 'loading');

    const data = await store.dispatch('emptyList', id);

    if (data && data.status) {
      updateNotify(idNotify.value, 'Lista vacia', 'success');
    } else {
      updateNotify(idNotify.value, 'Error al vaciar la lista', 'error');
    }
  } catch (error) {
    updateNotify(idNotify.value, 'Error al vaciar la lista', 'error');
  }
};

const updateList = async list => {
  try {
    // idNotify.value = notify('Cargando...', 'loading');

    const data = await store.dispatch('updateList', list);

    if (data && data.status) {
      // updateNotify(idNotify.value, 'Lista actualizada correctamente', 'success');
    } else {
      // updateNotify(idNotify.value, 'Error al actualizar la lista', 'error');
    }

  } catch (error) {
    // updateNotify(idNotify.value, 'Error al actualizar la lista', 'error');
  }
};

// Helpers

const dateExpiration = (date, getHtml = true) => {
  const now = new Date();
  const dateExpiration = new Date(date);

  let color = '';
  let backgroundColor = '';
  let msg = '';
  let showHTML = false;

  if (now.getTime() > dateExpiration.getTime()) {
    color = 'rgba(229, 0, 0, 0.8)';
    backgroundColor = 'rgba(229, 0, 0, 0.25)';
    msg = 'Plazo vencido';
    showHTML = true;
  } else if (now.getMonth() === dateExpiration.getMonth() &&
    (now.getDate() === dateExpiration.getDate() - 1 || now.getDate() === dateExpiration.getDate())) {
    color = 'rgba(0, 0, 0, 0.95)';
    backgroundColor = 'rgba(246, 160, 0, 0.95)';
    msg = 'Esta por expirar';
    showHTML = true;
  }

  if (!getHtml) {
    return {
      color,
      backgroundColor: backgroundColor,
      msg
    }
  }

  return !showHTML ? false : '<span style="border-radius: 3px; padding: 4px; color: ' + color + ' ; background-color: ' + backgroundColor + ' ;">' + msg + '</span>';
};

onMounted(() => {
  initCkeditor();
  store.dispatch('getLists');

  // Key listeners
  document.onkeydown = e => {
    if (e.keyCode === 27) {
      addList.value = false;
      taskForm.value.task_list_id = null;
      taskForm.value.title = '';
      showEditorModal.value = false;
      editorModal.setData('');
    }
  };
});

</script>

<template>
  <div class="lists-tasks-container">
    <div class="list-task" v-for="list in lists" :key="list.id">
      <input type="text" @blur="updateList(list)" @keydown="e => {
        if (e.keyCode === 13) {
          updateList(list);
        }
      }" v-model="list.name" class="title form-control">
      <div class="options">
        <div class="dropdown">
          <button class="btn btn-sm btn-h" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots"
              viewBox="0 0 16 16">
              <path
                d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
            </svg> </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" @click="deleteList(list.id)">Archivar</a></li>
            <li><a class="dropdown-item" @click="emptyList(list.id)">Vaciar (Archivar las tareas)</a></li>
          </ul>
        </div>

      </div>

      <div class="tasks" :id="'task_' + list.id"
        :style="{ maxHeight: taskForm.task_list_id === list.id ? '72.4vh' : '63vh' }">
        <div class="task" v-for="task in list.tasks" :key="task.id">
          <div class="back-task" @click="() => {
            modalTask = task;
            modalTaskTitle = task.title;
            closeAllActions();
          }" data-bs-toggle="modal" data-bs-target="#addTaskModal">
          </div>
          <p class="title-task">{{ task.title }}</p>
          <p class="created-due-date" :style="{ 'backgroundColor': dateExpiration(task.due_date, false).backgroundColor }"
            v-if="task.due_date"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="bi bi-clock" viewBox="0 0 16 16">
              <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
            </svg><span>{{ task.due_date }}</span></p>


          <div class="edit-task">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil"
              viewBox="0 0 16 16">
              <path
                d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
            </svg>

          </div>
        </div>

        <div v-if="taskForm.task_list_id === list.id">
          <form @submit.prevent="addTaskSubmit">
            <div class="task task-form">
              <input type="text" v-model="taskForm.title" class="form-control"
                placeholder="Introduzca un titulo para la tarea">
            </div>

            <div class="d-flex justify-content-start">
              <button type="submit" class="btn btn-primary btn-sm"><span>Agregar</span></button>
              <div class="cancel-task ms-3">
                <svg @click="taskForm.task_list_id = null"
                  style="width: 20px; height: 20px; margin-top: 6px; cursor: pointer;" class="bi bi-x-lg"
                  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path
                    d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div v-if="taskForm.task_list_id !== list.id" class="add-task" @click="() => {
        taskForm.task_list_id = list.id;
        moveDivDown('task_' + list.id);
      }">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg"
          viewBox="0 0 16 16">
          <path fill-rule="evenodd"
            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
        </svg> <span>Añade una tarea</span>
      </div>
    </div>

    <div v-if="addList">
      <form @submit.prevent="addListSubmit">
        <div class="list-task">
          <input type="text" v-model="titleListForm" class="form-control mb-4"
            placeholder="Introduzca un titulo para la lista">
          <div class="d-flex justify-content-start">
            <button type="submit" class="btn btn-primary btn-sm"><span>Agregar</span></button>
            <div class="cancel-task ms-3">
              <svg @click="addList = false" style="width: 23px; height: 23px; margin-top: 1px; cursor: pointer;"
                class="bi bi-x-lg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                viewBox="0 0 16 16">
                <path
                  d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
            </div>
          </div>
        </div>
      </form>
    </div>

    <div v-if="!addList">
      <div class="add-list" @click="addList = true">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg"
          viewBox="0 0 16 16">
          <path fill-rule="evenodd"
            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
        </svg> <span>Agregar lista</span>
      </div>
    </div>
  </div>

  <!-- Modal add task -->
  <div class="modal fade" style="margin: 0 0 0 0;" id="addTaskModal" tabindex="-1" aria-labelledby="addTaskModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-xl" style="max-width: 850px;">
      <div class="modal-content">
        <!-- <div class="modal-header">
          <h1 class="modal-title fs-5" id="addTaskModalLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div> -->
        <div class="modal-body">

          <div class="modal-content-section" v-if="modalTask">
            <div class="sections-modal">

              <div class="section-modal">
                <div class="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-credit-card" viewBox="0 0 16 16">
                    <path
                      d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                    <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                  </svg>
                </div>
                <div class="section">
                  <!-- <p class="title-section">{{ modalTask.title }}</p> -->
                  <input type="text" class="form-control input-modal-title" v-on:keydown="e => {
                    if (e.keyCode === 13) {
                      modalTask.title = modalTaskTitle;
                      updateTaskModal();
                    }
                  }" v-model="modalTaskTitle">

                  <div class="information-task" v-if="modalTask.due_date">
                    <p class="title-information">Vencimiento</p>
                    <div class="information">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-clock" viewBox="0 0 16 16">
                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                      </svg>
                      <p>{{ modalTask.due_date }} <span v-if="dateExpiration(modalTask.due_date)" class="ms-2"> <span
                            v-html="dateExpiration(modalTask.due_date)"></span></span></p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="section-modal">
                <div class="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-justify-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                      d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                  </svg>
                </div>
                <div class="section">
                  <p class="title-section">Descripción</p>

                  <div v-if="!modalTask.description">
                    <div class="add-description" @click="showEditorModal = true"
                      :class="{ 'd-none': showEditorModal, 'd-block': !showEditorModal }">
                      <p>Añadir una descripción mas detallada</p>
                    </div>
                  </div>

                  <div v-if="modalTask.description">
                    <div class="description-task" @click="() => {
                      showEditorModal = true;
                      editorModal.setData(modalTask.description);
                    }" :class="{ 'd-none': showEditorModal, 'd-block': !showEditorModal }">
                      <div v-html="modalTask.description"></div>
                    </div>
                  </div>

                  <div :class="{ 'show-editor': showEditorModal, 'hidde-editor': !showEditorModal }">
                    <div style="max-height: 300px; overflow-y: scroll;">
                      <div id="editor-modal"></div>
                    </div>
                    <div class="mt-3 d-flex justify-content-start">
                      <button @click="updateTaskModal" class="btn btn-primary btn-sm"><span>Guardar</span></button>
                      <button class="ms-3 btn btn-secondary btn-sm" @click="() => {
                        showEditorModal = false;
                        editorModal.setData('');
                      }"><span>Cancelar</span></button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="section-modal">
                <div class="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-ul"
                    viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                      d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                  </svg>
                </div>
                <div class="section">
                  <p class="title-section">Actividad</p>
                </div>
              </div>

            </div>

            <div class="actions-modal">
              <div class="actions">
                <p class="title-actions">Acciones</p>

                <p class="action" @click="deleteTaskModal" data-bs-dismiss="modal">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive"
                    viewBox="0 0 16 16">
                    <path
                      d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                  </svg> <span>Archivar</span>
                </p>

                <div class="action">
                  <div @click="() => {
                    closeAllActions();
                    showMoveTarjetModal = true;
                    taskModalListId = modalTask.task_list_id;
                    // positionModalTask = modalTask.positionModalTask;
                  }" class="back-action"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-arrow-right mt-1" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                  </svg><span>Mover</span>

                  <div class="click-action" v-if="showMoveTarjetModal">
                    <div class="close-action" @click="showMoveTarjetModal = false">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-x-lg" viewBox="0 0 16 16">
                        <path
                          d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                      </svg>
                    </div>

                    <p class="title-action-click">Mover tarjeta</p>

                    <p class="section-action">Seleccionar destino</p>

                    <div class="form-floating">
                      <select v-model="taskModalListId" class="form-select" style="font-weight: 400; font-size: 13px;">
                        <option value="" selected>Seleccione una opcion</option>
                        <option :value="item.id" v-for="item in lists" :key="item.id">
                          {{ item.name }}
                          <span v-if="item.id === modalTask.task_list_id"> (Actual)</span>
                        </option>
                      </select>
                      <label for="floatingTextarea2">Lista</label>
                    </div>

                    <div class="mt-3">
                      <button :disabled="taskModalListId === modalTask.task_list_id" @click="() => {
                        if (taskModalListId !== modalTask.task_list_id) {
                          modalTask.task_list_id = taskModalListId;
                          updateTaskModal();
                          modalTask.task_list_id = taskModalListId;
                        }
                      }" class="btn btn-primary btn-sm"><span>Mover</span></button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="actions">
                <p class="title-actions">Añadir a la tarjeta</p>

                <div class="action">
                  <div @click="() => {
                    closeAllActions();
                    dueDateTaskModal = modalTask.due_date;
                    showDatesTarjetModal = true;
                  }" class=" back-action"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock"
                    viewBox="0 0 16 16">
                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                  </svg> <span>Fechas</span>


                  <div class="click-action" v-if="showDatesTarjetModal">
                    <div class="close-action" @click="showDatesTarjetModal = false">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-x-lg" viewBox="0 0 16 16">
                        <path
                          d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                      </svg>
                    </div>

                    <p class="title-action-click">Fechas</p>

                    <p class="section-action">Fecha de vencimiento</p>

                    <input type="datetime-local" v-model="dueDateTaskModal" class="form-control">

                    <div class="mt-3 d-flex justify-content-start">
                      <button @click="() => {
                        if (!dueDateTaskModal) {
                          notify('La fecha es necesaria', 'error');
                          return;
                        }
                        modalTask.due_date = dueDateTaskModal.replace('T', ' ');
                        updateTaskModal();
                      }" class="btn btn-primary btn-sm"><span>Guardar</span></button>
                      <button @click="() => {
                        if (modalTask.due_date) {
                          modalTask.due_date = null;
                          dueDateTaskModal = null;
                          updateTaskModal();
                        }
                      }" class="btn btn-secondary btn-sm ms-2"><span>Quitar</span></button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
        <!-- <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><span>Cerrar</span></button>
          <button type="button" class="btn btn-primary"><span>Guardar</span></button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-modal-title {
  border: unset;
  font-size: 22px;
  padding-left: 0;
  margin-top: -10px;
}

.modal-content-section {
  display: flex;
  width: 100%;
  padding: 20px 10px;
  min-height: 550px;
  overflow-y: scroll;
}

.modal-content-section .actions-modal {
  width: 20%;
}

.actions-modal .actions {
  width: 100%;
  margin-bottom: 30px;
  padding: 0 0;
}

.actions-modal .actions .title-actions {
  margin-bottom: 5px;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.8);
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 900;
}

.actions-modal .actions .action {
  margin-bottom: 7px;
  display: flex;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.08);
  padding: 4px 8px;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color .2s ease-in-out;
  position: relative;
  /* z-index: 999; */
}

.action .back-action {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}

.actions-modal .actions .action .click-action {
  width: 300px;
  padding: 10px;
  background-color: rgb(205, 205, 205);
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 110%;
  left: -150px;
  z-index: 2000;
}

.actions-modal .actions .action .click-action .btn span {
  font-size: 13px !important;
  color: white;
}

.actions-modal .actions .action .click-action .form-control {
  font-size: 13px;
}

.actions-modal .actions .action .click-action .btn {
  padding: 7px 15px;
}

.action .click-action .close-action {
  position: absolute;
  top: 2px;
  right: 2px;
  z-index: 1100;
}

.action .click-action .title-action-click {
  margin-bottom: 20px;
  margin-top: 0;
  font-size: 15px;
  color: rgba(0, 0, 0, 1);
  text-align: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.action .click-action .section-action {
  font-size: 13px;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.action .click-action .close-action svg {
  width: 14px;
  height: 14px;
  color: black;
}

.actions-modal .actions .action svg {
  margin-top: 4px;
  margin-right: 10px;
}

.actions-modal .actions .action span {
  font-size: 15px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: black;
}

.actions-modal .actions .action:hover {
  background-color: rgba(0, 0, 0, 0.3);
}

.modal-content-section .sections-modal {
  margin-right: 10px;
  /* display: flex; */
  width: 80%;
}

.show-editor {
  opacity: 1;
  position: relative;
  z-index: 100;
}

.hidde-editor {
  opacity: 0;
  position: absolute;
  z-index: -1;
}

.sections-modal .section-modal {
  width: 100%;
  display: flex;
  margin-bottom: 40px;
}

.section-modal .icon {
  margin-right: 10px;
  width: 30px;
}

.section-modal .icon svg {
  width: 28px;
  height: 28px;
  color: rgba(0, 0, 0, 0.8);
}

.section-modal .section {
  width: 95%;
}

.section-modal .section .information-task {
  width: max-content;
  display: block;
  margin: 20px 0;
}

.section .information-task .title-information {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 6px;
  text-align: left;
  font-family: 'Nunito', sans-serif;
}

.section .information-task .information {
  padding: 8px 10px;
  display: flex;
  background-color: rgba(0, 0, 0, 0.07);
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: background-color .2s ease-in-out;
  cursor: pointer;
}

.section .information-task .information:hover {
  background-color: rgba(0, 0, 0, 0.15);
}

.section .information-task .information svg {
  color: rgba(0, 0, 0, 0.774);
  margin-top: 1px;
  margin-right: 10px;
}

.section .information-task .information p {
  margin-bottom: 0;
  font-family: 'Nunito', sans-serif;
  font-size: 13px;
  font-weight: 700;
  opacity: .9;
}

.section-modal .section .description-task {
  width: 99%;
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.03);
  cursor: pointer;
  border-radius: 3px;
  transition: background-color .1s ease-in-out;
}

.section-modal .section .add-description {
  width: 99%;
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.07);
  cursor: pointer;
  border-radius: 3px;
  transition: background-color .1s ease-in-out;
}

.section-modal .section .add-description p {
  font-size: 15px;
  font-family: 'Roboto', sans-serif;
  color: rgba(0, 0, 0, 0.9);
}

.section-modal .section .add-description:hover {
  background-color: rgba(0, 0, 0, 0.3);
}

.section-modal .section .title-section {
  margin-bottom: 20px;
  font-size: 20px;
  color: black;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 800;
}

.lists-tasks-container {
  overflow-x: scroll;
  padding: 20px 10px;
  display: flex;
  grid-gap: 20px;
}

.lists-tasks-container .add-list {
  background-color: rgba(0, 0, 0, 0.9);
  padding: 12px;
  max-height: 50px;
  min-width: 175px;
  cursor: pointer;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: background-color .2s ease-in-out;
}

.lists-tasks-container .add-list:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

.lists-tasks-container .add-list svg {
  width: 26px;
  height: 26px;
  margin-right: 10px;
  color: rgba(255, 255, 255, 0.8);
}

.lists-tasks-container .add-list span {
  font-size: 16px;
  font-family: 'Nunito', sans-serif;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.8);
}

.lists-tasks-container .list-task {
  background-color: rgba(255, 255, 255, 0.85);
  position: relative;
  width: 320px;
  min-width: 320px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: max-content;
}

.list-task .title {
  font-family: 'Nunito', sans-serif;
  width: 250px;
  font-weight: 600;
  font-size: 17px !important;
  margin-bottom: 0;
  background-color: transparent;
  border: unset !important;
  /* margin-left: -10px; */
  padding-left: 3px;
}

.list-task .title:focus {
  box-shadow: 0 0 5px rgb(13, 146, 255) !important;
}

.list-task .options {
  position: absolute;
  top: 10px;
  right: 2px;
}

.list-task .options svg {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.list-task .add-task {
  display: flex;
  justify-content: left;
  margin-top: 20px;
  cursor: pointer;
  transition: background-color .1s ease-in-out;
  padding: 7px;
  border-radius: 2px;
}

.list-task .add-task:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.list-task .add-task svg {
  margin-top: 2px;
  margin-right: 10px;
  width: 20px;
  height: 20px;
  color: rgba(0, 0, 0, 0.67);
}

.list-task .add-task span {
  font-family: 'Nunito', sans-serif;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.67);
}

.list-task .tasks {
  width: 100%;
  max-height: 63vh;
  overflow-y: scroll;
  /* overflow-x: hidden; */
}

.list-task .tasks .task-form:hover::before {
  content: "";
  width: 0;
  height: 0;
  border: unset;
}

.list-task .tasks .task {
  cursor: pointer;
  background-color: white;
  padding: 10px;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  margin: 10px 0;
  min-height: 50px;
  width: 98%;
  /* overflow: hidden; */
  position: relative;
  transition: scale .1s ease-in-out;
  /* z-index: 99; */
}

.list-task .tasks .task .back-task {
  position: absolute;
  z-index: 9;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.list-task .tasks .task .edit-task {
  position: absolute;
  top: 7px;
  z-index: 10;
  right: 5px;
  width: 33px;
  height: 33px;
  padding: 4px;
  border-radius: 50%;
  transition: background-color .2s ease-in-out;
  opacity: 0;
}

.list-task .tasks .task:hover .edit-task {
  opacity: 1;
}

.list-task .tasks .task .edit-task svg {
  width: 15px;
  height: 15px;
  color: black;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.list-task .tasks .task .edit-task:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.list-task .tasks .task::before {
  opacity: 0;
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 3px;
  border: 2px rgba(0, 0, 0, 0.7) solid;
}

.list-task .cancel-task {
  width: 30px;
  height: 30px;
  padding: 7px;
  border-radius: 2px;
  transition: background-color .2s ease-in-out;
}

.list-task .cancel:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.list-task .form-control {
  border: unset;
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  border-bottom: 1px rgba(0, 0, 0, 0.3) solid;
  border-radius: 3px;
}

.list-task .form-control::placeholder {
  font-family: 'Nunito', sans-serif;
}

.list-task .form-control:focus {
  border: unset;
  box-shadow: unset;
  border-bottom: 1px rgba(0, 0, 0, 0.3) solid;
  border-radius: 3px;
}

.list-task .tasks .task:hover::before {
  opacity: 1;
  /* scale: 1.03; */
}

.list-task .tasks .task:first-child {
  margin-top: 20px;
}

.list-task .tasks .task .title-task {
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  margin-bottom: 0;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.8);
}

.list-task .tasks .task .created-due-date {
  /* position: absolute; */
  /* bottom: 0px; */
  /* right: 5px; */
  margin-bottom: 0;
  margin-top: 12px;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 7px;
  border-radius: 2px;
  width: max-content;
  color: rgba(0, 0, 0, 0.7);
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
}

.list-task .tasks .task .created-due-date svg {
  color: rgba(0, 0, 0, 0.8);
  width: 17px;
  height: 17px;
  margin-top: -2px;
  margin-right: 6px;

}
</style>
