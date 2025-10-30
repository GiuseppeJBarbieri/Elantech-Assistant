import { io, Socket } from 'socket.io-client';

const URL = process.env.REACT_APP_API_URL || 'http://localhost:3002';

class SocketService {
    private socket: Socket | null = null;
    private static instance: SocketService;

    private constructor() { }

    public static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }

    public connect(): void {
        if (!this.socket) {
            this.socket = io(URL, {
                autoConnect: true,
                transports: ['websocket'],
            });

            this.socket.on('connect', () => {
                console.log('Connected to server with ID:', this.socket?.id);
            });

            this.socket.on('disconnect', (reason) => {
                console.log('Disconnected from server:', reason);
            });

            this.socket.on('connect_error', (error) => {
                console.error('Connection error:', error);
            });
        }
    }

    public disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    public getSocket(): Socket | null {
        return this.socket;
    }

    public on(event: string, callback: (...args: any[]) => void): void {
        if (this.socket) {
            this.socket.on(event, callback);
        }
    }

    public off(event: string, callback?: (...args: any[]) => void): void {
        if (this.socket) {
            this.socket.off(event, callback);
        }
    }

    public emit(event: string, data?: any): void {
        if (this.socket) {
            this.socket.emit(event, data);
        }
    }
}

export default SocketService.getInstance();