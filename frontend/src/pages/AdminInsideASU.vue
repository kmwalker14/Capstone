<template>
  <div class="admin-container">
    <div class="layout-wrapper">
      
      <main class="main-content">
        <header class="header">
          <h1 class="page-title">Inside ASU</h1>
          <div class="user-profile">
            <div class="user-info">
              <span class="user-name">Samira G.</span>
              <span class="user-role">Admin</span>
            </div>
            <div class="user-avatar"></div>
          </div>
        </header>
        <section class="content-section">
          <div class="banner"> <!-- REMOVE ??? -->
          </div>
          <div class="profile-content">
            <div class="profile-details">
              <div class="profile-header-section">
              </div>
              <section class="about-section">

                <div v-if="editor" class="tiptap">

                  <div class="control-group">

                    <div class="button-group">
                      <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">H1</button>
                      <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">H2</button>

                      <button @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
                        <font-awesome-icon :icon="paragraphIcon" />
                      </button>
                      <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
                        <i class="fa fa-bold"></i>
                      </button>
                      <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
                        <i class="fa fa-italic"></i>
                      </button>
                      <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
                        <i class="fa fa-strikethrough"></i>
                      </button>
                      <button @click="editor.chain().focus().toggleHighlight().run()" :class="{ 'is-active': editor.isActive('highlight') }">
                        <font-awesome-icon :icon="highlightIcon" />
                      </button>
                      <button @click="editor.chain().focus().setTextAlign('left').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
                        <i class="fa fa-align-left"></i>
                      </button>
                      <button @click="editor.chain().focus().setTextAlign('center').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
                        <i class="fa fa-align-center"></i>
                      </button>
                      <button @click="editor.chain().focus().setTextAlign('right').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
                        <i class="fa fa-align-right"></i>
                      </button>
                      <div class="dropdown">
                        <button class="dropdown-button">Font</button>
                        <div class="dropdown-content">
                          <button @click="editor.chain().focus().setFontFamily('Inter').run()">Inter</button>
                          <button @click="editor.chain().focus().setFontFamily('Comic Sans MS, Comic Sans').run()">Comic Sans</button>
                          <button @click="editor.chain().focus().setFontFamily('serif').run()">Serif</button>
                          <button @click="editor.chain().focus().setFontFamily('monospace').run()">Monospace</button>
                          <button @click="editor.chain().focus().setFontFamily('cursive').run()">Cursive</button>
                          <button @click="editor.chain().focus().unsetFontFamily().run()">Unset Font</button>
                        </div>
                      </div>

                      <!-- Add Image Button -->
                      <button @click="addImage">Add image</button>

                      <!-- Upload Document Button -->
                      <button @click="triggerFileUpload">
                        <font-awesome-icon :icon="faFileUpload" />
                      </button>
                      <input type="file" ref="fileInput" @change="handleFileUpload" accept=".pdf,.doc,.docx,.jpg, .png" style="display: none;" />

                      <button @click="addLink">🔗 Link</button>

                    </div>
                  </div>

                  <editor-content :editor="editor" />
                </div>
              </section>
            </div>
          </div>
          <button class="submit-button" @click="submitContent">Submit</button>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
import Document from '@tiptap/extension-document'
import FontFamily from '@tiptap/extension-font-family'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import TextStyle from '@tiptap/extension-text-style'
import Link from '@tiptap/extension-link'
import { Editor, EditorContent } from '@tiptap/vue-3'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faParagraph } from '@fortawesome/free-solid-svg-icons'
import 'font-awesome/css/font-awesome.css'
import { faHighlighter } from '@fortawesome/free-solid-svg-icons'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'

export default {
name: 'AdminInsideASU',
  components: {
    EditorContent,
    FontAwesomeIcon
  },
  data() {
    return {
      editor: null,
      paragraphIcon: faParagraph,
      highlightIcon: faHighlighter,
      faFileUpload
    }
  },
methods: {
  setPage(page) {
    this.$emit('page-changed', page);
  },

  addLink() {
    const url = window.prompt("Enter the URL:");
    if (url) {
      this.editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  },

  submitContent() {
    const content = this.editor.getHTML();
    console.log('Submitted Content:', content);
    alert('Content Submitted! Check the console for output.');
    // You can send the content to an API or handle it accordingly
  },

  addImage() {
    const url = window.prompt('Enter image URL:')
    if (url) {
      this.editor.chain().focus().setImage({ src: url }).run()
    }
  },
  triggerFileUpload() {
    this.$refs.fileInput.click()
  },
  handleFileUpload(event) {
    const file = event.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      this.editor.chain().focus().insertContent(`<a href="${url}" target="_blank">${file.name}</a> `).run()
    }
  }
},
  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        TextAlign.configure({types: ['heading', 'paragraph']}),
        FontFamily.configure({
          types: ['textStyle'],
        }),
        Highlight,
        Image,
        TextStyle,
        Link,
        Document,
        Paragraph,
        Text,
        FontFamily,
      ],
      content: `<p>I am a rich text editor</p>`,
    })
  },
  beforeUnmount() {
    if (this.editor) {
      this.editor.destroy()
    }
  },
};
</script>

<style scoped>
/* Styles the main container that holds the entire admin layout */
.admin-container {
  background: var(--Color-Background, #f3f4ff);
  padding: 0 37px 0 0;
  overflow: hidden;
  flex-grow: 1;
  width: 100%;
}

/* Flex container that holds the sidebar and main content */
.layout-wrapper {
  display: flex;
  gap: 37px; /* Space between sidebar and content*/
  width: 100%;
  flex-grow: 1;
  padding: 0px 15px 0px 15px;
}

/* Main content styling */
.main-content {
  width: 100%;
  flex-grow: 1;
  padding: 20px;
}

/* Header with page title and user details */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 13px 0 36px;
  font-family: Poppins, sans-serif;
}

.page-title {
  color: var(--Color-Text, #303972);
  font: 700 36px Poppins, sans-serif;
  margin: 0;
}

.user-profile {
  display: flex;
  gap: 18px;
  align-items: center;
}

.user-info {
  text-align: center;
}

/* User text styling for name and role */
.user-name {
  color: var(--Color-Text, #303972);
  font: 600 14px Poppins, sans-serif;
  display: block;
}

.user-role {
  color: var(--Color-Gray-3, #a098ae);
  font: 400 14px Poppins, sans-serif;
  margin-top: 4px;
  display: block;
}

/* Avatar styling */
.user-avatar {
  width: 60px;
  height: 60px;
  border-radius: 40px;
  background: var(--Color-Gray-2, #c1bbeb);
}

/* Content section styling */
.content-section {
  background: #fff;
  border-radius: 20px;
  margin-top: 20px;
}

/* Banner styling */
.banner {
  position: relative;
  min-height: 100px;
}

/* Profile styling */
.profile-content {
  display: flex;
  justify-content: flex-start; /* Align to the left */
  align-items: center; /* Vertically center */
  height: 100%; /* Full available height */
  padding: 20px;
}

.tiptap {
  width: 100%;
  max-width: 800px; /* Limit the width if necessary */
  margin-top: 20px; /* Space from the top */
  font-weight: normal
}

.control-group {
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  gap: 8px;
}

.submit-button {
  display: block;
  width: 140px;
  height: 50px;
  margin: 20px auto;
  background: var(--Color-Purple, #4d44b5);
  color: #fff;
  border: none;
  border-radius: 40px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 20px 50px 0 rgba(191, 21, 108, 0.05);
  transition: background 0.3s ease-in-out;
}

.submit-button:hover {
  background: #3b3791;
}

.button-group button {
  padding: 8px 12px;
  background-color: transparent;
  color: black;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.2s ease-in-out;
  font-family: inherit;
}

.button-group button:hover {
  background-color: transparent;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-button {
  padding: 8px 12px;
  background-color: transparent;
  color: black;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.2s ease-in-out;
  font-family: inherit;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1;
  min-width: 150px;
}

.dropdown-content button {
  display: block;
  width: 100%;
  padding: 10px;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
}

.dropdown-content button:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.profile-details {
width: 100%;
color: var(--Color-Text, #303972);
font-family: Poppins, sans-serif;
}

.profile-header-section {
display: flex;
justify-content: space-between;
flex-wrap: wrap;
gap: 20px;
}

/* REMOVE ??? */
.profile-title {
font: 700 32px Poppins, sans-serif;
margin: 10;     /*T: 10, O: 0*/
padding-right: 1%; /*T: 1%, O: null*/
}

/* Styling for about section */
.section-title {
font: 700 24px Poppins, sans-serif;
margin: 34px 0 30px;
}

.section-content {
font: 400 18px Poppins, sans-serif;
text-align: justify;
margin: 0;
}

/* Media queries for responsive design go here */
</style>