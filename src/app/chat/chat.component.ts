import { MessageService } from './../service/message.service';
import { ConversationService } from './../service/conversation.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  conversations: any[] = [];
  filteredConversations: any[] = [];
  selectedConversation: any;
  messages: any[] = [];
  newMessage: string = '';
  isMinimized: boolean = false;
  filter: string = 'active';
  editedConversationName: string = '';
  isEditing: boolean = false;

  constructor(
    private conversationService: ConversationService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.loadConversations();
  }

  // Cargar todas las conversaciones
  loadConversations() {
    this.conversationService.listConversation().subscribe((data: any) => {
      this.conversations = data;
      this.filterConversations(this.filter);
    });
  }

  // Filtrar conversaciones por estado
  filterConversations(status: string) {
    this.filter = status;
    // Llamar a la API para obtener conversaciones activas o inactivas
    this.conversationService.listActiveConversation(status === 'active' ? 'A' : 'I').subscribe((data: any) => {
      console.log("Datos de conversaciones:", data);
      this.filteredConversations = data;
    });
  }

  // Agregar una nueva conversación
  addConversation() {
    const newConversation = {
      topic: 'Nuevo Chat',
    };
    this.conversationService.newConversation(newConversation).subscribe(() => {
      this.loadConversations();
    });
  }

  togglePanel() {
    this.isMinimized = !this.isMinimized;
  }

  archive(conversation: any) {
    Swal.fire({
      title: "¿Quieres archivar la conversacion?",
      icon: "warning",
      color: "#ffffff",
      background: "#111111",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, archivalo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.conversationService.disableConversationById(conversation.conversationId).subscribe(() => {
          Swal.fire({
            title: "¡Archivado!",
            text: "Su conversacion ha sido archivado.",
            icon: "success",
            color: "#ffffff",
            background: "#111111"
          });
          this.loadConversations();
        }, (error) => {
          console.error("Error al archivar la conversación:", error);
        });
      }
    });
  }

  desarchive(conversation: any) {
    Swal.fire({
      title: "¿Quieres desarchivar la conversacion?",
      icon: "warning",
      color: "#ffffff",
      background: "#111111",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, desarchivalo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.conversationService.activateConversationById(conversation.conversationId).subscribe(() => {
          Swal.fire({
            title: "¡Desarchivado!",
            text: "Su conversacion ha sido desarchivada.",
            icon: "success",
            color: "#ffffff",
            background: "#111111"
          });
          this.loadConversations();
        }, (error) => {
          console.error("Error al desarchivar la conversación:", error);
        });
      }
    });
  }

  deleteConversation(conversation: any) {
    Swal.fire({
      title: "¿Quieres eliminar la conversación?",
      icon: "warning",
      color: "#ffffff",
      background: "#111111",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.conversationService.deleteConversation(conversation.conversationId).subscribe(() => {
          Swal.fire({
            title: "¡Eliminado!",
            text: "La conversación ha sido eliminada.",
            icon: "success",
            color: "#ffffff",
            background: "#111111"
          });
          this.loadConversations(); // Recargar la lista de conversaciones
        }, (error) => {
          console.error("Error al eliminar la conversación:", error);
        });
      }
    });
  }

  updateConversation(conversation: any) {
    this.editedConversationName = conversation.topic; // Guardar el nombre actual
    this.isEditing = true; // Activar el modo de edición
    this.selectedConversation = conversation; // Almacenar la conversación seleccionada
  }

  saveUpdatedConversation() {
    if (this.editedConversationName.trim()) {
      const updatedConversation = {
        topic: this.editedConversationName,
      };
      this.conversationService.updateConversationById(this.selectedConversation.conversationId, updatedConversation).subscribe(() => {
        Swal.fire({
          title: "¡Actualizado!",
          text: "El nombre de la conversación ha sido actualizado.",
          icon: "success",
          color: "#ffffff",
          background: "#111111"
        });
        this.loadConversations(); // Recargar la lista de conversaciones
        this.isEditing = false; // Desactivar el modo de edición
      }, (error) => {
        console.error("Error al actualizar la conversación:", error);
      });
    }
  }

  cancelEdit() {
    this.isEditing = false; // Desactivar el modo de edición
    this.editedConversationName = ''; // Limpiar el nombre editado
    this.selectedConversation = null; // Resetear la conversación seleccionada
  }

  // Seleccionar una conversación
  selectConversation(conversation: any) {
    if (this.selectedConversation && this.selectedConversation.conversationId === conversation.conversationId) {
      // Si ya está seleccionada, no hace nada
      return;
    }
    this.cancelEdit(); // Cancela la edición antes de seleccionar una nueva conversación
    this.selectedConversation = conversation;
    this.loadMessages(conversation.conversationId);
  }

  // Cargar mensajes de la conversación seleccionada
  loadMessages(conversationId: number) {
    this.messageService.listMessageConversation(conversationId).subscribe((data: any) => {
      this.messages = data;
    });
  }

  // Enviar un nuevo mensaje
  sendMessage() {
    if (this.newMessage.trim()) {
      const messageToSend = {
        conversationId: this.selectedConversation.conversationId, // Asegúrate de enviar el ID de la conversación
        question: this.newMessage,
      };

      this.messageService.newMessage(messageToSend).subscribe(
        () => {
          this.newMessage = ''; // Limpia el textarea
          this.loadMessages(this.selectedConversation.conversationId); // Cargar mensajes actualizados
        },
        (error) => {
          console.error("Error al enviar el mensaje:", error); // Manejo de errores
        }
      );
    }
  }

  onMessageInput() {
    // Aquí podrías añadir cualquier lógica adicional si es necesario, pero no es obligatorio.
  }
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Evita que se inserte un salto de línea
      this.sendMessage();
    }
  }

  stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }
}