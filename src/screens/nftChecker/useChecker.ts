import { useEffect, useState } from "react"
import manifest from './manifest.json'

enum Status {
    success = 'success',
    failed = 'failed'
}

enum StatusText {
    success = 'BullishByte with this hash is legit',
    failed = 'This hash is not from BullishBytes collection'
}

const useChecker = () => {
    const [status, setStatus] = useState({
        status: '',
        text: ''
    })
    const [hash, setHash] = useState('')

    const check = async () => {
        console.log(hash)
        if (!hash) return

        if (manifest.includes(hash) || manifest.includes(`${hash.slice(0, -2)}`)) {
            setStatus({
                status: Status.success,
                text: StatusText.success
            })
        }
        else {
            setStatus({
                status: Status.failed,
                text: StatusText.failed
            })
        }

        await new Promise((resolve) => {
            setTimeout(() => {
                setStatus({
                    status: '',
                    text: ''
                })
                resolve('sf')
            }, 10000)
        })
    }

    useEffect(() => {
        setStatus({
            status: '',
            text: ''
        })
    }, [hash])

    return {
        status,
        hash,
        setHash,
        check,
    }
}

export default useChecker