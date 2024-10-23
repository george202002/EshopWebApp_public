package org.example.eshopbackend.database.repository;

import org.example.eshopbackend.database.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findAllByOrderByIdAsc();
    Optional<Item> findById(Long id);
}
