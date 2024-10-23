package org.example.eshopbackend.azure;

import com.azure.storage.blob.*;
import com.azure.storage.blob.models.BlobHttpHeaders;
import com.azure.storage.blob.models.BlobStorageException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class AzureBlobService {

    private final BlobContainerClient containerClient;

    public AzureBlobService(@Value("${azure.storage.connection-string}") String connectionString,
                            @Value("${azure.storage.container-name}") String containerName) {
        BlobServiceClient serviceClient = new BlobServiceClientBuilder().connectionString(connectionString).buildClient();
        this.containerClient = serviceClient.getBlobContainerClient(containerName);
    }

    public String uploadImage(MultipartFile file, String blobName) throws IOException {
        try {
            BlobClient blobClient = containerClient.getBlobClient(blobName);

            BlobHttpHeaders headers = new BlobHttpHeaders().setContentType(file.getContentType());
            blobClient.upload(file.getInputStream(), file.getSize(), true);
            blobClient.setHttpHeaders(headers);

            return blobClient.getBlobUrl();
        } catch (BlobStorageException e) {
            throw new IOException("Failed to upload file to Azure Blob Storage", e);
        }
    }

    public void deleteFile(String blobName) throws IOException {
        try {
            BlobClient blobClient = containerClient.getBlobClient(blobName);
            blobClient.delete();
        } catch (BlobStorageException e) {
            throw new IOException("Failed to delete file from Azure Blob Storage", e);
        }
    }
}
