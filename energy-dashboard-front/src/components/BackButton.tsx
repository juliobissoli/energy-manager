import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

function BackButton() {
    const handleBack = () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = '/';
        }
    };


    return (
        <Button variant="link" onClick={handleBack} className='gap-2'>
            <ArrowLeft size={14} /> voltar
        </Button>
    );
}

export default BackButton;
